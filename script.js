// Basic interactions: nav toggle, form handler, reveal on scroll
document.addEventListener('DOMContentLoaded', function(){
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  if(navToggle){
    navToggle.addEventListener('click', ()=>{
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      if(navList.style.display === 'flex') navList.style.display = 'none'; else navList.style.display = 'flex';
    });
  }

  window.handleSubmit = function(e){
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    if(!name || !email){
      alert('Please complete the form.');
      return;
    }
    // For static demo: show a friendly message. Replace with real backend or form service.
    alert('Thanks, ' + name + '! I will reach out to ' + email + '.');
    e.target.reset();
  };

  // Reveal elements on scroll
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  },{threshold:0.12});
  document.querySelectorAll('.section, .project-card, .card, .hero-content').forEach(el=>{
    el.classList.add('reveal');
    observer.observe(el);
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-list a');
  const setActive = () =>{
    let index = sections.length;
    while(--index && window.scrollY + 120 < sections[index].offsetTop){}
    navLinks.forEach(a=>a.classList.remove('active'));
    const id = sections[index] && sections[index].id;
    const activeLink = document.querySelector('.nav-list a[href="#'+id+'"]');
    if(activeLink) activeLink.classList.add('active');
  };
  setActive();
  window.addEventListener('scroll', setActive);
});
