import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const firebaseConfig={
    apiKey:"AIzaSyBmsjwNLq0LPzKyuh-8oi1hJDh6Vu_FyVo",
    authDomain:"spark-dataserver.firebaseapp.com",
    projectId:"spark-dataserver",
    storageBucket:"spark-dataserver.appspot.com",
    messagingSenderId:"557063328262",
    appId:"1:557063328262:web:2d89d0b64a012f59786987",
    measurementId:"G-JL7P874P73"
};

const app=initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

document.getElementById('login-page').onclick=()=>window.location.href='login.html';
const nextBtn=document.getElementById('nextBtn');
const prevBtn=document.getElementById('prevBtn');
const step1=document.getElementById('step-1');
const step2=document.getElementById('step-2');
const warn1=document.getElementById('warn1');
const warn2=document.getElementById('warn2');
const signup=document.getElementById('signupBtn');

prevBtn.addEventListener('click',function(){
    step2.classList.add('hidden');
    step1.classList.remove('hidden');
});

nextBtn.addEventListener('click',function(){
    const email=document.getElementById('email').value;
    const pwd=document.getElementById('pwd').value;
    const cpwd=document.getElementById('cpwd').value;
    const passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,20}$/;

    if(email===''||pwd===''||cpwd===''){
        warn1.innerText='Please fill in all fields';
        warn1.style.textAlign='center';
    }
    else if(pwd!==cpwd){
        warn1.innerText='Passwords do not match';
        warn1.style.textAlign='center';
    }
    else if(!email.endsWith('@sece.ac.in')){
        warn1.innerText='Email must belong to the sece.ac.in domain';
        warn1.style.textAlign='center';
    }
    else if(pwd.length>=6&&pwd.length<=20&&passwordPattern.test(pwd)){
        warn1.innerText='Password must be between 6 and 20 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
        warn1.style.textAlign='center';
    }
    else{
        step1.classList.add('hidden');
        step2.classList.remove('hidden');
        warn1.innerText='';
    }
});

signup.addEventListener('click',async function(){
    let lcname=document.getElementById('leetcode').value;
    let ccname=document.getElementById('codechef').value;
    const email=document.getElementById('email').value;
    const pwd=document.getElementById('pwd').value;

    warn2.innerText='';

    if(lcname===''||ccname===''||email===''||pwd===''){
        warn2.innerText='Please fill in all fields';
        warn2.style.textAlign='center';
        return;
    }

    try{
        const response1=await fetch(`https://competeapi.vercel.app/user/leetcode/${lcname}`);
        const lcdata=await response1.json();

        const response2=await fetch(`https://competeapi.vercel.app/user/codechef/${ccname}`);
        const ccdata=await response2.json();

        if(ccdata.error){
            warn2.innerText='Recheck that CodeChef username.';
            warn2.style.textAlign='center';
            return;
        }

        if(!lcdata.data||!lcdata.data.matchedUser){
            warn2.innerText='Recheck that LeetCode username.';
            warn2.style.textAlign='center';
            return;
        }

        await createUserAccountWithUsernames(email,pwd,lcname,ccname);

    }catch(error){
        warn2.innerText='Error validating usernames. Please try again later.';
        warn2.style.color='red';
    }
});

async function createUserAccountWithUsernames(email,password,leetcodeUsername,codechefUsername){
    console.log(`Creating user: ${email}`)
    try {
        const userCredential=await createUserWithEmailAndPassword(auth, email, password);
        const user=userCredential.user;
        await setDoc(doc(db,"users",user.uid), {
            email:email,
            leetcodeUsername:leetcodeUsername,
            codechefUsername:codechefUsername
        });
        warn2.innerText=`Account created successfully! Let's take you to the login page...`;
        warn2.style.color='green';
        warn2.style.textAlign='center';
        setTimeout(()=>{
            window.location.href='login.html';
        },1700);
    }catch(error){
        console.error("Error creating user:",error);
        warn2.innerText='Failed to create an account for you. Please try again later.';
        warn2.style.color='red';
    }
}
