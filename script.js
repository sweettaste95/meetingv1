 
 function showSection(sectionId) {
    // ✅ إخفاء جميع الأقسام أولًا
    const sections = ["welcome-container", "dashboard", "schedule-meeting", "add-report"];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) section.style.display = "none";
    });

    // ✅ إظهار القسم المطلوب فقط
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = "block";
        console.log(`✅ تم عرض القسم: ${sectionId}`);
    }

    // ✅ تحديث بيانات الاجتماعات واسم الموظف عند فتح "إضافة تقرير"
    if (sectionId === "add-report") {
        console.log("🔄 إعادة تحميل الاجتماعات وبيانات الموظف...");
        
        const employeeName = localStorage.getItem("FullName");
        const employeeNameInput = document.getElementById("report-employee-name");
        if (employeeName && employeeNameInput) {
            employeeNameInput.value = employeeName;
        }

        if (typeof loadPendingMeetings === "function") {
            loadPendingMeetings();
        } else {
            console.error("❌ خطأ: الدالة loadPendingMeetings غير معرفة!");
        }
    }

    // ✅ إعادة تشغيل الشريط الزمني فور الدخول
    if (typeof updateTimelineBar === "function") {
        updateTimelineBar();
    } else {
        console.error("❌ خطأ: الدالة updateTimelineBar غير معرفة!");
    }

    // ✅ تحميل بيانات الموظفين عند فتح "إشعار الاجتماع"
    if (sectionId === "schedule-meeting") {
        console.log("🔄 إعادة تحميل بيانات الموظفين...");
        loadEmployees();
        loadWeekDays();
        loadMeetingTypes();
    }

  // ✅ تصفير الحقول عند مغادرة شاشة "إشعار الاجتماع"
if (sectionId !== "schedule-meeting") {
    console.log("🧹 تصفير جميع الحقول عند مغادرة شاشة إشعار الاجتماع...");
    const meetingForm = document.getElementById("meeting-form");
    if (meetingForm) meetingForm.reset(); // ✅ تأكد أن الفورم موجود قبل تنفيذ reset()
}

if (sectionId !== "add-report") {
    console.log("🧹 تصفير جميع الحقول عند مغادرة شاشة إضافة التقرير...");
    
    const reportMeetingSelect = document.getElementById("report-meeting-select");
    const reportTopic = document.getElementById("report-meeting-topic");
    const reportDate = document.getElementById("report-meeting-date");
    const reportDay = document.getElementById("report-meeting-day");
    const reportText = document.getElementById("report-text");
    const reportFile = document.getElementById("report-file");

    // ✅ تصفير جميع الحقول يدويًا
    if (reportMeetingSelect) reportMeetingSelect.value = "";
    if (reportTopic) reportTopic.value = "";
    if (reportDate) reportDate.value = "";
    if (reportDay) reportDay.value = "";
    if (reportText) reportText.value = "";
    if (reportFile) reportFile.value = "";

    console.log("✅ تم تصفير جميع الحقول بنجاح!");
}

   }

  document.addEventListener("DOMContentLoaded", function () {
    // ✅ تعريف العناصر الأساسية
    const loginForm = document.getElementById("login-form");
    const loginContainer = document.getElementById("login-container");
    const dashboard = document.getElementById("dashboard");
    const logoutBtn = document.getElementById("logout-btn");
    const languageBtn = document.getElementById("language-btn");
    const darkModeBtn = document.getElementById("dark-mode-btn");
    const sidebarMenu = document.getElementById("sidebar-menu"); // ✅ القائمة الجديدة بدلًا من الميني بار القديم
    const menuBtn = document.getElementById("menu-btn");
    const reportForm = document.getElementById("report-form");
    const currentTimeDisplay = document.getElementById("current-time");

    // ✅ التحقق مما إذا كان المستخدم مسجل دخول أم لا
    if (localStorage.getItem("username")) {
        showDashboard();
        updateHeaderUsername();

        // ✅ إذا كان مسجل دخول، نظهر زر التلوغو والقائمة الجانبية
        if (menuBtn) menuBtn.style.display = "inline-block";
        if (logoutBtn) logoutBtn.style.display = "inline-block";
    } else {
        // ❌ إذا لم يكن مسجل دخول، نخفي التلوغو وزر تسجيل الخروج والقائمة الجانبية
        if (menuBtn) menuBtn.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "none";
        if (sidebarMenu) sidebarMenu.classList.remove("show-menu");
    }

    // ✅ تفعيل الوضع الداكن عند الضغط على الزر
    if (darkModeBtn) {
        darkModeBtn.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("darkMode", "enabled");
                darkModeBtn.textContent = "☀️";
            } else {
                localStorage.setItem("darkMode", "disabled");
                darkModeBtn.textContent = "🌙";
            }
        });

        // ✅ عند تحميل الصفحة، التحقق مما إذا كان الوضع الداكن مفعلاً مسبقًا
        if (localStorage.getItem("darkMode") === "enabled") {
            document.body.classList.add("dark-mode");
            darkModeBtn.textContent = "☀️";
        } else {
            document.body.classList.remove("dark-mode");
            darkModeBtn.textContent = "🌙";
        }
    }

    let currentLang = "ar"; // ✅ اللغة الافتراضية العربية

    // ✅ تبديل اتجاه القائمة عند تغيير اللغة
    if (languageBtn) {
        languageBtn.addEventListener("click", function () {
            currentLang = currentLang === "ar" ? "en" : "ar";
            document.documentElement.lang = currentLang;
            document.body.dir = currentLang === "ar" ? "rtl" : "ltr";
            languageBtn.textContent = currentLang === "ar" ? "🇸🇦" : "🇬🇧";

            if (sidebarMenu) {
                sidebarMenu.style.direction = currentLang === "ar" ? "rtl" : "ltr";
            }
        });
    }
    
    
    
    
    
    
    

    // ✅ تفعيل فتح وإغلاق القائمة الجانبية عند الضغط على زر التلوغو
 // ✅ تفعيل فتح وإغلاق القائمة الجانبية عند الضغط على زر التلوغو
    if (menuBtn && sidebarMenu) {
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
        document.body.appendChild(overlay);
    
        menuBtn.addEventListener("click", () => {
            const isOpen = sidebarMenu.classList.contains("show-menu");
            
            if (isOpen) {
                sidebarMenu.classList.remove("show-menu");
                overlay.classList.remove("active");
                menuBtn.innerHTML = "☰"; // إعادة الأيقونة للقائمة
            } else {
                sidebarMenu.classList.add("show-menu");
                overlay.classList.add("active");
                menuBtn.innerHTML = "&times;"; // تغيير الأيقونة إلى X
            }
    
            menuBtn.classList.toggle("open");
        });
    
        overlay.addEventListener("click", () => {
            sidebarMenu.classList.remove("show-menu");
            overlay.classList.remove("active");
            menuBtn.innerHTML = "☰"; // إعادة الأيقونة عند الإغلاق
            menuBtn.classList.remove("open");
        });
    
        const menuItems = sidebarMenu.querySelectorAll("li");
        menuItems.forEach((item) => {
            item.addEventListener("click", () => {
                sidebarMenu.classList.remove("show-menu");
                overlay.classList.remove("active");
                menuBtn.innerHTML = "☰"; // إعادة الأيقونة عند اختيار عنصر
                menuBtn.classList.remove("open");
            });
        });
    }
    



    // ✅ تحديث الوقت بشكل تلقائي
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString(currentLang === "ar" ? "ar-SA" : "en-US", { hour: '2-digit', minute: '2-digit' });
        if (currentTimeDisplay) {
            currentTimeDisplay.textContent = "🕒 " + timeString;
        }
    }

    setInterval(updateTime, 1000);
    updateTime();

    // ✅ معالجة تسجيل الدخول
    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            const errorMessage = document.getElementById("error-message");

            if (!username || !password) {
                errorMessage.textContent = "❌ يرجى إدخال اسم المستخدم وكلمة المرور";
                return;
            }

            // ✅ رابط API للتحقق من بيانات المستخدم
            const scriptURL = "https://script.google.com/macros/s/AKfycbxhw6pt3x0riaD41KOLQ1OeYBylfrlTdpIUUhxtlZrA-KSh7lLccPYk-lm8e5XHO_II/exec";
            const requestURL = `${scriptURL}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

            try {
                const response = await fetch(requestURL, { method: "GET" });
                const data = await response.json();

                if (data.status === "success") {
                    localStorage.setItem("username", username);
                    localStorage.setItem("role", data.role);
                    localStorage.setItem("department", data.department);
                    localStorage.setItem("FullName", data.FullName);

                    updateHeaderUsername();
                    showDashboard();
                } else {
                    errorMessage.textContent = "❌ بيانات تسجيل الدخول غير صحيحة.";
                }
            } catch (error) {
                errorMessage.textContent = "❌ فشل الاتصال بالخادم.";
            }
        });
    }
});

// ✅ دالة عرض شاشة الترحيب بعد تسجيل الدخول
function showDashboard() {
    const loginContainer = document.getElementById("login-container");
    if (loginContainer) loginContainer.style.display = "none";

    const fullName = localStorage.getItem("FullName") || "مستخدم غير معروف";
    const department = localStorage.getItem("department") || "الإدارة غير معروفة";

    const welcomeUsername = document.getElementById("welcome-username");
    const welcomeDepartment = document.getElementById("welcome-department");
    const welcomeContainer = document.getElementById("welcome-container");

    if (welcomeUsername && welcomeDepartment && welcomeContainer) {
        welcomeUsername.textContent = fullName;
        welcomeDepartment.textContent = (department === "الإدارة العامة للتقنية الرقمية") 
            ? "الإدارة العامة للتقنية الرقمية" 
            : `إدارة ${department}`;

        welcomeContainer.style.display = "block";
    }

    const menuBtn = document.getElementById("menu-btn");
    const logoutBtn = document.getElementById("logout-btn");

    if (menuBtn) menuBtn.style.display = "inline-block";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
}

// ✅ تحديث اسم المستخدم في الهيدر
function updateHeaderUsername() {
    const fullName = localStorage.getItem("FullName") || "مستخدم غير معروف";
    const headerUsername = document.getElementById("header-username");

    if (headerUsername) {
        headerUsername.textContent = `👤 ${fullName}`;
    }
}

// ✅ استدعاء تحديث اسم المستخدم عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", updateHeaderUsername);

//===========================================================================================================
    // ✅ تسجيل الخروج
//===========================================================================================================

 // ✅ دالة تسجيل الخروج المحدثة
function logoutUser() {
    // ✅ عرض رسالة تأكيد قبل تسجيل الخروج
    if (!confirm("⚠ هل أنت متأكد أنك تريد تسجيل الخروج؟")) {
        return; // إذا ضغط المستخدم على "إلغاء"، لا يتم تنفيذ تسجيل الخروج
    }

    const fullName = localStorage.getItem("FullName") || "المستخدم"; // جلب اسم المستخدم من LocalStorage

    // ✅ حذف بيانات المستخدم بالكامل
    localStorage.clear();

    // ✅ إخفاء جميع العناصر المرتبطة بالمستخدم
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("welcome-container").style.display = "none";
    document.getElementById("schedule-meeting").style.display = "none";
    document.getElementById("add-report").style.display = "none";
    
    // ✅ تحديث اسم القائمة الجانبية وفقًا للتعديلات الأخيرة
    const sidebarMenu = document.getElementById("sidebar-menu");
    if (sidebarMenu) sidebarMenu.classList.remove("show-menu"); // ✅ إخفاء الميني بار عند تسجيل الخروج

    // ✅ إخفاء اسم المستخدم وزر الخروج
    document.getElementById("header-username").style.display = "none";
    document.getElementById("logout-btn").style.display = "none"; 

    // ✅ إخفاء زر القائمة (الميني بار) بعد الخروج
    const menuBtn = document.getElementById("menu-btn");
    if (menuBtn) menuBtn.style.display = "none";

    // ✅ عرض رسالة تسجيل الخروج
    const logoutMessage = document.createElement("div");
    logoutMessage.className = "logout-message";
    logoutMessage.innerHTML = `
        <div class="logout-box">
            <i class="fa fa-sign-out-alt"></i> <!-- أيقونة تسجيل الخروج -->
            <h2>👋 شكرًا لك، <strong>${fullName}</strong></h2>
            <p>تم تسجيل خروجك بنجاح.</p>
            <p>📌 سيتم تحويلك الآن إلى صفحة تسجيل الدخول...</p>
        </div>
    `;

    // ✅ إضافة الرسالة إلى الصفحة
    document.body.appendChild(logoutMessage);

    // ✅ إعادة التوجيه إلى شاشة تسجيل الدخول مباشرة
    setTimeout(() => {
window.location.href = window.location.href;
    }, 2000);
}

// ✅ ربط زر تسجيل الخروج بالدالة
document.getElementById("logout-btn").addEventListener("click", logoutUser);


//================================================================================================================

// التقرير

//================================================================================================================
document.addEventListener("DOMContentLoaded", function () {
    // ✅ تعريف العناصر الأساسية
    const meetingSelect = document.getElementById("report-meeting-select");
    const topicInput = document.getElementById("report-meeting-topic");
    const dateInput = document.getElementById("report-meeting-date");
    const dayInput = document.getElementById("report-meeting-day");
    const employeeNameInput = document.getElementById("report-employee-name");
    const reportText = document.getElementById("report-text");
    const reportFile = document.getElementById("report-file");
    const submitReportBtn = document.getElementById("submit-report");

    // ✅ جلب بيانات الموظف من LocalStorage
    const employeeName = localStorage.getItem("FullName");
    const department = localStorage.getItem("department");

   // ✅ البحث عن مكان إدراج الشريط الزمني داخل نموذج إضافة التقرير
const reportContainer = document.getElementById("add-report");

// ✅ التأكد من أن الشريط الزمني غير مكرر وإضافته في المكان الصحيح
let timelineBar = document.getElementById("timeline-bar");
if (!timelineBar) {
    timelineBar = document.createElement("div");
    timelineBar.id = "timeline-bar";
    timelineBar.textContent = "جاري تحميل الاجتماعات...";
    reportContainer.insertBefore(timelineBar, reportContainer.firstChild);
}

// ✅ تحديث محتوى الشريط الزمني عند تحميل الاجتماعات
function updateTimelineMessage(count) {
    if (count > 0) {
        timelineBar.innerHTML = `📢 عزيزي ${employeeName}، لديك <strong>${count}</strong> اجتماعات لم ترفع تقاريرها.`;
        timelineBar.style.display = "block";
    } else {
        timelineBar.innerHTML = `🎉 شكراً لك ${employeeName}، لا توجد اجتماعات قيد الانتظار! 😊`;
        timelineBar.style.display = "block";
    }
}

    // ✅ رابط Google Apps Script لجلب الاجتماعات
    const scriptURL = "https://script.google.com/macros/s/AKfycbypTRiy_7wIXloVBVnNY-9jqio9MgT5rUzdSZGp9crVaM75gi4dKIFeAc0aQlSRPrCC/exec";

    // ✅ تحميل الاجتماعات "قيد الانتظار" للموظف الحالي
    async function loadPendingMeetings() {
    if (!employeeName) {
        console.error("❌ خطأ: لم يتم العثور على اسم الموظف في LocalStorage!");
        return;
    }

    const requestURL = `${scriptURL}?action=getPendingMeetings&employee=${encodeURIComponent(employeeName)}`;

    try {
        const response = await fetch(requestURL);
        const data = await response.json();

        if (data.status === "Success" && data.meetings.length > 0) {
            meetingSelect.innerHTML = '<option value="">🔍 اختر اجتماعًا...</option>';
            data.meetings.forEach(meeting => {
                let option = document.createElement("option");
                option.value = meeting.id;
                option.textContent = `📌 ${meeting.topic} - ${meeting.date}`;
                option.setAttribute("data-topic", meeting.topic);
                option.setAttribute("data-date", meeting.date);
                option.setAttribute("data-day", meeting.day);
                meetingSelect.appendChild(option);
            });

            console.log("✅ تم تحميل الاجتماعات قيد الانتظار!");
            updateTimelineMessage(data.meetings.length);
        } else {
            meetingSelect.innerHTML = '<option value="">⚠️ لا توجد اجتماعات قيد الانتظار</option>';
            updateTimelineMessage(0);
        }
    } catch (error) {
        console.error("❌ خطأ أثناء جلب الاجتماعات:", error);
    }
}


    // ✅ عند اختيار اجتماع، يتم استرجاع **موضوع الاجتماع، التاريخ، ويوم الاجتماع**
    meetingSelect.addEventListener("change", function () {
        const selectedOption = meetingSelect.options[meetingSelect.selectedIndex];

        if (selectedOption.value) {
            topicInput.value = selectedOption.getAttribute("data-topic") || "";
            dateInput.value = selectedOption.getAttribute("data-date") || "";
            dayInput.value = selectedOption.getAttribute("data-day") || "";
        } else {
            topicInput.value = "";
            dateInput.value = "";
            dayInput.value = "";
        }
    });

    // ✅ تحميل الاجتماعات عند فتح الصفحة
    loadPendingMeetings();



  

// ✅ تحديث الشريط الزمني عند تحميل الاجتماعات
async function loadPendingMeetings() {
    if (!employeeName) {
        console.error("❌ خطأ: لم يتم العثور على اسم الموظف في LocalStorage!");
        return;
    }

    const requestURL = `${scriptURL}?action=getPendingMeetings&employee=${encodeURIComponent(employeeName)}`;

    try {
        const response = await fetch(requestURL);
        const data = await response.json();

        if (data.status === "Success" && data.meetings.length > 0) {
            meetingSelect.innerHTML = '<option value="">🔍 اختر اجتماعًا...</option>';
            data.meetings.forEach(meeting => {
                let option = document.createElement("option");
                option.value = meeting.id;
                option.textContent = `📌 ${meeting.topic} - ${meeting.date}`;
                option.setAttribute("data-topic", meeting.topic);
                option.setAttribute("data-date", meeting.date);
                option.setAttribute("data-day", meeting.day);
                meetingSelect.appendChild(option);
            });

            console.log("✅ تم تحميل الاجتماعات قيد الانتظار!");
            updateTimelineMessage(data.meetings.length);
        } else {
            meetingSelect.innerHTML = '<option value="">⚠️ لا توجد اجتماعات قيد الانتظار</option>';
            updateTimelineMessage(0);
        }
    } catch (error) {
        console.error("❌ خطأ أثناء جلب الاجتماعات:", error);
    }
}

// ✅ إخفاء الشريط الزمني عند اختيار اجتماع
meetingSelect.addEventListener("change", function () {
    if (meetingSelect.value) {
        timelineBar.style.display = "none";
    }
});
  
    // ✅ دالة إرسال تقرير الاجتماع
    async function submitReport() {
        const meetingID = meetingSelect.value;
        const topic = topicInput.value;
        const date = dateInput.value;
        const day = dayInput.value;
        const reportTextValue = reportText.value;
        const fileInput = reportFile.files[0];

        if (!meetingID || !reportTextValue) {
            alert("❌ يرجى اختيار اجتماع وإدخال التقرير!");
            return;
        }

        // ✅ تعطيل زر الإرسال أثناء العملية
        submitReportBtn.disabled = true;
        submitReportBtn.textContent = "🔄 جاري إرسال التقرير...";

        let fileData = "";
        if (fileInput) {
            const reader = new FileReader();
            reader.onload = function (event) {
                fileData = event.target.result.split(",")[1]; // تحويل الملف إلى Base64
                sendReport(meetingID, topic, date, day, reportTextValue, fileData);
            };
            reader.readAsDataURL(fileInput);
        } else {
            sendReport(meetingID, topic, date, day, reportTextValue, "");
        }
    }

    // ✅ إرسال البيانات إلى Google Apps Script
    async function sendReport(meetingID, topic, date, day, report, fileData) {
        const reportData = {
            action: "submitReport",
            employee: employeeName,
            department: department,
            meetingID: meetingID,
            topic: topic,
            date: date,
            day: day,
            report: report,
            file: fileData
        };

        try {
            console.log("📤 إرسال البيانات إلى:", scriptURL);
            console.log("📄 البيانات المرسلة:", reportData);

            await fetch(scriptURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reportData),
                mode: "no-cors" // ✅ تجنب مشاكل CORS
            });

            // ✅ تشغيل صوت التأكيد بعد الإرسال
            playSuccessSound();

            // ✅ عرض رسالة نجاح
            showPopupMessage("✅ شكراً لك، تم إرسال التقرير بنجاح!", () => {
                // ✅ تصفية الحقول بعد الإرسال
                clearReportForm();

                // ✅ إعادة تفعيل الزر بعد نجاح الإرسال
                submitReportBtn.disabled = false;
                submitReportBtn.textContent = "📤 إرسال التقرير";

                // ✅ تحديث الاجتماعات فورًا بعد الإرسال
                loadPendingMeetings();

                // ✅ العودة للصفحة الرئيسية بعد 3 ثوانٍ
                setTimeout(() => {
                    showSection("dashboard");
                }, 3000);
            });

        } catch (error) {
            console.error("❌ خطأ أثناء إرسال التقرير:", error);
            alert("❌ فشل الاتصال بالخادم.");

            // ✅ إعادة تفعيل الزر في حال فشل الإرسال
            submitReportBtn.disabled = false;
            submitReportBtn.textContent = "📤 إرسال التقرير";
        }
    }

    // ✅ دالة تصفية الحقول بعد الإرسال
    function clearReportForm() {
        meetingSelect.value = "";
        topicInput.value = "";
        dateInput.value = "";
        dayInput.value = "";
        reportText.value = "";
        reportFile.value = "";
    }

    // ✅ دالة تشغيل صوت التأكيد
    function playSuccessSound() {
        let audio = new Audio('https://www.fesliyanstudios.com/play-mp3/4386');
        audio.play();
    }

    // ✅ دالة عرض إشعار (Popup)
    function showPopupMessage(message, callback) {
        const popup = document.createElement("div");
        popup.className = "popup-message";
        popup.textContent = message;
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove();
            if (callback) callback();
        }, 2000); // يختفي بعد ثانيتين
    }

    // ✅ ربط زر الإرسال بالدالة الجديدة
    submitReportBtn.addEventListener("click", submitReport);
});

//================================================================================================================



















//==============================================================

// كل ايتعلق ببرمجةذج ارسال اشبالاجتماع //

//==============================================================
// ✅ دالة لتحميل بيانات الموظفين (يجب أن تكون متاحة عالميًا)
function loadWeekDays() {
    const meetingDaySelect = document.getElementById("meeting-day");
    const days = [
        { name: "الأحد", icon: "🌞" },
        { name: "الاثنين", icon: "📅" },
        { name: "الثلاثاء", icon: "📆" },
        { name: "الأربعاء", icon: "🗓️" },
        { name: "الخميس", icon: "📋" },
        { name: "الجمعة", icon: "🕌" },
        { name: "السبت", icon: "🏖️" }
    ];

    // ✅ تفريغ القائمة وإعادة تعبئتها مع الأيقونات
    meetingDaySelect.innerHTML = '<option value="">اختر اليوم</option>';
    days.forEach(day => {
        let option = document.createElement("option");
        option.value = day.name;
        option.textContent = `${day.icon} ${day.name}`;
        meetingDaySelect.appendChild(option);
    });

    console.log("✅ تم تحميل أيام الأسبوع مع الأيقونات بنجاح!");
}

async function loadEmployees() {
    const employeeSelect = document.getElementById("assigned-employee");
    const emailInput = document.getElementById("employee-email");
    const phoneInput = document.getElementById("employee-phone");

    // ✅ جلب الإدارة الحالية من تسجيل الدخول
    const department = localStorage.getItem("department");
    if (!department) {
        console.error("❌ خطأ: لم يتم العثور على بيانات الإدارة.");
        return;
    }
// 2:meating and whtsup and email v97
    // ✅ رابط جلب بيانات الموظفين بناءً على الإدارة
    const scriptURL = "https://script.google.com/macros/s/AKfycbxn9bXVhL9rW3l1FN8zLQkXJKFVvzuBFXhZsHhqXkYEz-CWRHhSkeMOOMdw1FhiSQEs/exec";
    const employeesURL = `${scriptURL}?action=getEmployeesByDepartment&department=${encodeURIComponent(department)}`;

    // ✅ مسح القائمة قبل إعادة تحميلها لمنع التكرار
    employeeSelect.innerHTML = '<option value="">جارٍ تحميل الموظفين...</option>';

    try {
        console.log("📤 إرسال طلب لجلب الموظفين...");
        const response = await fetch(employeesURL);
        const data = await response.json();

        console.log("🔄 بيانات الموظفين المستلمة:", data);
      if (data.status === "Success" && data.employees.length > 0) {
    employeeSelect.innerHTML = ''; // ✅ تفريغ القائمة قبل الإضافة
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "اختر الموظف";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    employeeSelect.appendChild(defaultOption);

    data.employees.forEach(emp => {
        let option = document.createElement("option");
        option.value = emp.name;
        option.setAttribute("data-email", emp.email);
        option.setAttribute("data-phone", emp.phone);
        option.textContent = `${emp.name} (${emp.role})`; // ✅ إظهار الدور بجانب الاسم
        employeeSelect.appendChild(option);
    });
} else {
    employeeSelect.innerHTML = '';
    const noEmployeesOption = document.createElement("option");
    noEmployeesOption.value = "";
    noEmployeesOption.textContent = "⚠️ لا يوجد موظفون متاحون";
    noEmployeesOption.disabled = true;
    employeeSelect.appendChild(noEmployeesOption);


            console.warn("❌ لم يتم العثور على موظفين!");
        }
    } catch (error) {
        console.error("❌ خطأ أثناء جلب الموظفين:", error);
        employeeSelect.innerHTML = '<option value="">❌ فشل في جلب الأسماء</option>';
    }


    // ✅ تحديث البريد والهاتف عند اختيار الموظف
    employeeSelect.addEventListener("change", function () {
        const selectedOption = employeeSelect.options[employeeSelect.selectedIndex];
        emailInput.value = selectedOption.getAttribute("data-email") || "";
        phoneInput.value = selectedOption.getAttribute("data-phone") || "";

       // ✅ تحديث لون النص عند اختيار الموظف
if (emailInput.value && phoneInput.value) {
    emailInput.style.color = "red";
    emailInput.style.fontWeight = "bold"; // ✅ إضافة خط غامق
    phoneInput.style.color = "red";
    phoneInput.style.fontWeight = "bold"; // ✅ إضافة خط غامق
} else {
    emailInput.style.color = "black";
    emailInput.style.fontWeight = "normal"; // ✅ العودة للوضع الطبيعي
    phoneInput.style.color = "black";
    phoneInput.style.fontWeight = "normal"; // ✅ العودة للوضع الطبيعي
}

    });   
}

// ✅ دالة تحميل أيام الأسبوع تلقائيًا في القائمة المنسدلة مع أيقونات
function loadWeekDays() {
    const meetingDaySelect = document.getElementById("meeting-day");

    // ✅ قائمة الأيام مع أيقونات (إيموجي) تعبر عن كل يوم
    const days = {
        "الأحد": "🌞",
        "الاثنين": "📅",
        "الثلاثاء": "✏️",
        "الأربعاء": "📖",
        "الخميس": "🚀",
        "الجمعة": "🕌",
        "السبت": "🎉"
    };

    // ✅ تفريغ القائمة وإعادة تعبئتها
    meetingDaySelect.innerHTML = '<option value="">📆 اختر اليوم</option>';
    Object.entries(days).forEach(([day, icon]) => {
        let option = document.createElement("option");
        option.value = day;
        option.textContent = `${icon} ${day}`; // ✅ إضافة الأيقونة قبل اسم اليوم
        meetingDaySelect.appendChild(option);
    });

    console.log("✅ تم تحميل أيام الأسبوع مع الأيقونات بنجاح!");
}


// ✅ استهداف عناصر النموذج
const meetingForm = document.getElementById("meeting-form");
const meetingMessage = document.getElementById("meeting-message");


// ✅ دالة عرض إشعار (Popup)
function showPopupMessage(message, callback) {
    const popup = document.createElement("div");
    popup.className = "popup-message";
    popup.textContent = message;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
        if (callback) callback();
    }, 2000); // يختفي بعد ثانيتين
}

// ✅ دالة تشغيل صوت التأكيد
function playSuccessSound() {
    let audio = new Audio('https://www.fesliyanstudios.com/play-mp3/4386');
    audio.play();
}

// ✅ دالة إرسال إشعار الاجتماع
meetingForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // ✅ جلب القيم من الحقول
    const topic = document.getElementById("meeting-topic").value.trim();
    const entity = document.getElementById("meeting-entity").value.trim();
    const date = document.getElementById("meeting-date").value.trim();
    const day = document.getElementById("meeting-day").value.trim();
    const employee = document.getElementById("assigned-employee").value.trim();
    const email = document.getElementById("employee-email").value.trim();
    const phone = document.getElementById("employee-phone").value.trim();
    const meetingType = document.getElementById("meeting-type").value.trim();

    // ✅ التأكد من تعبئة الحقول
    if (!topic || !entity || !date || !day || !employee || !email || !phone) {
        showPopupMessage("❌ يرجى إدخال جميع الحقول المطلوبة!");
        return;
    }

    // ✅ تعطيل زر الإرسال مؤقتًا أثناء العملية
    const submitButton = meetingForm.querySelector("button");
    submitButton.disabled = true;
    submitButton.textContent = "🔄 جاري الإرسال...";

    // 2:meating and whtsup and email v97

    // ✅ تجهيز البيانات المرسلة
    const requestData = { topic, entity, date, day, employee, email, phone, meetingType };
    const scriptURL = "https://script.google.com/macros/s/AKfycbxn9bXVhL9rW3l1FN8zLQkXJKFVvzuBFXhZsHhqXkYEz-CWRHhSkeMOOMdw1FhiSQEs/exec";

    try {
        console.log("📤 إرسال البيانات إلى:", scriptURL);
        console.log("📄 البيانات المرسلة:", requestData);
        await fetch(scriptURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
            mode: "no-cors"
        });

        // ✅ تشغيل صوت الإشعار عند نجاح الإرسال
        showPopupMessage("✅ تم إرسال الإشعار بنجاح!", () => {
            playSuccessSound(); // 🔊 تشغيل الصوت عند نجاح الإرسال
            showPopupMessage("📩 سيتم نقلك الآن إلى واتساب...", () => {
                
                // ✅ تجهيز رابط واتساب
                const whatsappMessage = `🌟 *إشعار بموعد اجتماع رسمي* 🌟
                *عزيزي الموظف: ${employee}*،
                نحيطكم علمًا بأنه قد تم تحديد موعد اجتماع لكم، إليكم التفاصيل:
                📌 *موضوع الاجتماع:* ${topic}  
                🏢 *الجهة المنظمة:* ${entity}  
                📅 *التاريخ:* ${date}  
                📆 *اليوم:* ${day}  
                نرجو الالتزام بالموعد المحدد، مع خالص التحيات.
                🔹 *الإدارة العامة للتقنية الرقمية* 🔹`;

                const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`;
                console.log("🔗 رابط واتساب:", whatsappLink);
                window.open(whatsappLink, "_blank");

                // ✅ تصفية البيانات بعد الفتح
                meetingForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = "📤 إرسال الإشعار";

                // ✅ العودة إلى الشاشة الرئيسية بعد 3 ثوانٍ
                setTimeout(() => {
                    showSection("dashboard");
                }, 3000);
            });
        });

    } catch (error) {
        console.error("❌ خطأ أثناء الاتصال بالخادم:", error);
        showPopupMessage("❌ فشل الاتصال بالخادم.");
        submitButton.disabled = false;
        submitButton.textContent = "📤 إرسال الإشعار";
    }
});

 function loadMeetingTypes() {
    const meetingTypeSelect = document.getElementById("meeting-type");

    const meetingTypes = [
        { name: "اجتماع تقني", icon: "💻" },
        { name: "اجتماع أمني", icon: "🔒" },
        { name: "اجتماع فني", icon: "⚙️" },
        { name: "اجتماع إداري", icon: "🏢" },
        { name: "اجتماع مالي", icon: "💰" },
        { name: "ورشة عمل", icon: "🛠️" },
        { name: "مؤتمر", icon: "🎤" },
        { name: "ندوة", icon: "📖" },
        { name: "اجتماع طارئ", icon: "🚨" }
    ];

    // ✅ تفريغ القائمة وإعادة تعبئتها مع الأيقونات
    meetingTypeSelect.innerHTML = '<option value="">اختر نوع الاجتماع</option>';
    meetingTypes.forEach(type => {
        let option = document.createElement("option");
        option.value = type.name;
        option.textContent = `${type.icon} ${type.name}`;
        meetingTypeSelect.appendChild(option);
    });

    console.log("✅ تم تحميل أنواع الاجتماعات مع الأيقونات بنجاح!");
}







document.addEventListener("DOMContentLoaded", function () {
    const logo = document.querySelector(".logo");
    const darkModeBtn = document.getElementById("dark-mode-btn");

    if (!logo || !darkModeBtn) return;

    const lightModeLogo = "https://github.com/sweettaste95/hilal-images/blob/main/moi22.jpeg?raw=true";

    const darkModeLogo = "https://github.com/sweettaste95/hilal-images/blob/main/moi.png?raw=true";  // شعار الوضع الليلي (يمكنك تغييره لاحقًا)

    // ✅ تأكد أن الشعار يظهر دائمًا بشكل صحيح
    function updateLogo() {
        if (document.body.classList.contains("dark-mode")) {
            logo.src = darkModeLogo;
        } else {
            logo.src = lightModeLogo;
        }
    }

    // ✅ تغيير الشعار عند الضغط على زر الوضع الليلي
    darkModeBtn.addEventListener("click", function () {
        setTimeout(updateLogo, 100); // تأخير بسيط لضمان تحديث الصورة بعد تبديل الوضع
    });

    // ✅ التحقق عند تحميل الصفحة
    updateLogo();
});
