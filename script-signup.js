const firebaseConfig = {
    apiKey: "AIzaSyBmsjwNLq0LPzKyuh-8oi1hJDh6Vu_FyVo",
    authDomain: "spark-dataserver.firebaseapp.com",
    projectId: "spark-dataserver",
    storageBucket: "spark-dataserver.appspot.com",
    messagingSenderId: "557063328262",
    appId: "1:557063328262:web:2d89d0b64a012f59786987",
    measurementId: "G-JL7P874P73"
};

document.getElementById('login-page').onclick = () => window.location.href = 'login.html';
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const warn1 = document.getElementById('warn1');
const warn2 = document.getElementById('warn2');
const signup = document.getElementById('signupBtn');

    prevBtn.addEventListener('click', function() {
    step2.classList.add('hidden');
    step1.classList.remove('hidden');
    });

   nextBtn.addEventListener('click', function()
   {
    const email = document.getElementById('email').value;
    const pwd = document.getElementById('pwd').value ;
    const cpwd = document.getElementById('cpwd').value;
   
    if(email === '' || pwd === '' || cpwd === '')
    {
        warn1.innerText = 'Please fill in all fields';
        warn1.style.textAlign='center';
    }
    else if(pwd !== cpwd)
    {
        warn1.innerText = 'Passwords do not match';
        warn1.style.textAlign='center';
    }
    else
    {
        step1.classList.add('hidden');
        step2.classList.remove('hidden');
        warn1.innerText = '';
    }
    }
);
signup.addEventListener('click', function()
{
    const lcname=document.getElementById('leetcode').value;
    const ccname=document.getElementById('codechef').value;
    const email=document.getElementById('email').value;
    const pwd=document.getElementById('pwd').value;
    if(lcname === ''||ccname === '')
    {
        warn2.innerText = 'Please fill in all fields';
        warn2.style.textAlign='center';
    }
    else
    {
        
    }
}
);
