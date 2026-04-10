let students = [];

// رابط ملف CSV
const csvUrl = "csv/transinfo.csv";

// تحميل ملف CSV
fetch(csvUrl)
  .then(res => res.text())
  .then(text => {
    students = parseCSV(text);
  });

// تحويل CSV إلى Array
function parseCSV(text) {
  let lines = text.trim().split("\n");
  let headers = lines[0].split(",");
  let data = [];

  for (let i = 1; i < lines.length; i++) {
    let values = lines[i].split(",");
    let obj = {};
    headers.forEach((h, j) => obj[h.trim()] = values[j]?.trim() || "");
    data.push(obj);
  }
  return data;
}

// البحث أثناء الكتابة (في الاسم أو رقم الجوال)
document.getElementById("searchName").addEventListener("input", function() {
  let keyword = this.value.trim().toLowerCase();
  let res = document.getElementById("result");

  if (keyword === "") {
    res.style.display = "none"; 
    return;
  }

  // ✅ البحث فقط في الاسم أو رقم الجوال
  let matches = students.filter(s => 
    s.name.toLowerCase().includes(keyword) || 
    s.mob.includes(keyword)
  );

  res.style.display = "block"; 
  showResults(matches);
});

function showResults(list) {
  let res = document.getElementById("result");
  if (list.length > 0) {
    res.innerHTML = list.map(s => 
      `<div class="student">
         <div class="name">👤 الاســــــــم: ${s.name}</div>
         <div>📱 رقـم الجوال: ${s.mobile}</div>
         <div class="num">🔢 رقم الحوالة: ${s.Rnumber}</div>
         <div>💰 المبــــــــــلغ: ${s.Tamount}</div>
       </div>`
    ).join("");
  } else {
    res.innerHTML = "❌ لا توجد نتائج مطابقة.";
  }
}

// زر مسح البحث
function clearSearch() {
  document.getElementById("searchName").value = "";
  document.getElementById("result").style.display = "none";
}
