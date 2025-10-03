function openTab(evt, url) {
  // تغيير رابط iframe
  document.getElementById("tabframe").src = url;

  // إزالة active من جميع الأزرار
  var tablinks = document.getElementsByClassName("tablinks");
  for (var i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // إضافة active للزر الحالي
  evt.currentTarget.className += " active";
}

// تشغيل أول تبويب عند تحميل الصفحة
window.onload = function() {
  document.getElementsByClassName("tablinks")[0].click();
};