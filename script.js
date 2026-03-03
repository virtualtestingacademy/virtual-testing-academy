const faders = document.querySelectorAll('.fade');

const appearOnScroll = new IntersectionObserver(function(entries,observer){
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
},{ threshold:0.2 });

faders.forEach(fader=>{
    appearOnScroll.observe(fader);
});

const counters = document.querySelectorAll('.counter');
const speed = 200;

const startCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;

      if(count < target){
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 15);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

const statsSection = document.querySelector('.stats');

const counterObserver = new IntersectionObserver(entries => {
  if(entries[0].isIntersecting){
    startCounters();
    counterObserver.disconnect();
  }
});

counterObserver.observe(statsSection);