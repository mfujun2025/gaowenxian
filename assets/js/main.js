(function () {
  // 移动端汉堡菜单
  var btn = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (btn && nav) {
    btn.addEventListener('click', function () { nav.classList.toggle('open'); });
  }

  // 询盘表单 -> FormSubmit AJAX（首次提交后需点击激活邮件，之后自动转发）
  var form = document.getElementById('inquiryForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var name = v('f-name'), email = v('f-email');
      if (!name) { alert('请填写姓名'); return; }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('请填写有效的邮箱'); return; }
      if (!v('f-message')) { alert('请简单描述您的需求'); return; }
      var tip = document.getElementById('formTip');
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = '正在发送…';
      var payload = JSON.stringify({
        _subject: '【官网询盘】' + (v('f-model') || '高温线需求') + ' - ' + name,
        _template: 'table',
        _captcha: 'false',
        _replyto: email,
        姓名: name,
        公司: v('f-company') || '未填',
        邮箱: email,
        电话: v('f-phone') || '未填',
        需求型号: v('f-model') || '未填',
        温度电压要求: v('f-req') || '未填',
        需求描述: v('f-message')
      });
      var endpoints = [
        'https://formsubmit.co/ajax/mfujun@agent.qq.com',
        'https://formsubmit.co/ajax/tjph4166@agent.qq.com'
      ];
      // 飞书群机器人：询盘卡片实时推送
      var feishu = fetch('https://open.feishu.cn/open-apis/bot/v2/hook/5273cf88-cca5-4ffa-806b-99fe703473f6', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          msg_type: 'text',
          content: { text: '【官网询盘】\n姓名：' + name + '\n公司：' + (v('f-company') || '未填') +
            '\n邮箱：' + email + '\n电话：' + (v('f-phone') || '未填') +
            '\n需求型号：' + (v('f-model') || '未填') +
            '\n温度/电压要求：' + (v('f-req') || '未填') +
            '\n需求描述：' + v('f-message') }
        })
      });
      Promise.allSettled(endpoints.map(function (ep) {
        return fetch(ep, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: payload
        }).then(function (r) { return r.json(); });
      }).concat([feishu])).then(function (results) {
        var mailOk = results.slice(0, 2).some(function (res) {
          return res.status === 'fulfilled' && res.value && (res.value.success === 'true' || res.value.success === true);
        });
        var fsRes = results[2];
        var fsOk = fsRes && fsRes.status === 'fulfilled' && fsRes.value && (fsRes.value.code === 0 || fsRes.value.StatusCode === 0);
        if (mailOk) {
          form.reset();
          tip.className = 'form-ok';
          tip.style.display = 'block';
          tip.textContent = '✓ 询盘已发送，我们会在 24 小时内回复到您的邮箱 ' + email;
        } else if (fsOk) {
          form.reset();
          tip.className = 'form-ok';
          tip.style.display = 'block';
          tip.textContent = '✓ 询盘已送达（邮件通道波动，不影响跟进），会尽快回复到 ' + email;
        } else {
          tip.className = 'form-err';
          tip.style.display = 'block';
          tip.textContent = '✗ 发送失败，请直接发邮件到 mfujun@agent.qq.com';
        }
      }).catch(function () {
        tip.className = 'form-err';
        tip.style.display = 'block';
        tip.textContent = '✗ 网络异常，请直接发邮件到 mfujun@agent.qq.com';
      }).finally(function () {
        btn.disabled = false;
        btn.textContent = '发送询盘';
      });
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
