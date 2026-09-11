(function () {
  // 移动端汉堡菜单
  var btn = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (btn && nav) {
    btn.addEventListener('click', function () { nav.classList.toggle('open'); });
  }

  // 询盘表单 -> mailto 预填（Formspree 接入后替换 action 即可）
  var form = document.getElementById('inquiryForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var name = v('f-name'), email = v('f-email');
      if (!name) { alert('请填写姓名'); return; }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('请填写有效的邮箱'); return; }
      if (!v('f-message')) { alert('请简单描述您的需求'); return; }
      var subject = '【官网询盘】' + (v('f-model') || '高温线需求') + ' - ' + name;
      var body = '姓名：' + name + '\n公司：' + v('f-company') + '\n邮箱：' + email +
        '\n电话：' + v('f-phone') + '\n需求型号：' + v('f-model') +
        '\n温度/电压要求：' + v('f-req') + '\n\n需求描述：\n' + v('f-message');
      window.location.href = 'mailto:mfujun@agent.qq.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      var tip = document.getElementById('formTip');
      if (tip) tip.style.display = 'block';
    });
  }

  // 邮箱一键复制
  var copyBtn = document.getElementById('copyEmail');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var addr = 'mfujun@agent.qq.com';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(addr).then(function () {
          copyBtn.textContent = '已复制';
          setTimeout(function () { copyBtn.textContent = '复制邮箱'; }, 1500);
        });
      }
    });
  }
})();
