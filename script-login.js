document.getElementById('signup-trigger').onclick = () => window.location.href = 'signup.html';

const firebaseConfig = 
{
    apiKey: "AIzaSyBmsjwNLq0LPzKyuh-8oi1hJDh6Vu_FyVo",
    authDomain: "spark-dataserver.firebaseapp.com",
    projectId: "spark-dataserver",
    storageBucket: "spark-dataserver.appspot.com",
    messagingSenderId: "557063328262",
    appId: "1:557063328262:web:2d89d0b64a012f59786987",
    measurementId: "G-JL7P874P73"
};

firebase.initializeApp(firebaseConfig);

document.getElementById('signup-trigger').onclick = () => window.location.href = 'signup.html';

const email =document.getElementById('email-login').value;
const password = document.getElementById('pwd-login').value;
const warning = document.getElementById('warning');

document.getElementById('loginBtn').onclick = () => {
    if(email === '' || password === ''){
        warning.innerText = 'Please fill in all fields';
    }
    else {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) =>{
            warning.innerText = 'Login successful';
            warning.style.color = 'green';
        })
    }
}













function logIn(email,password) {
    firebase.auth().signInWithEmailAndPassword(email,password)
        .then((userCredential)=>{
            const user=userCredential.user;
            const userId=user.uid;
            firebase.database().ref('users/'+userId).once('value')
                .then((snapshot)=>{
                    if(snapshot.exists()) {
                        const userData=snapshot.val();
                        console.log('User logged in:',user);
                        console.log('CodeChef Username:',userData.codechef);
                        console.log('LeetCode Username:',userData.leetcode);
                    }
                    else {
                        console.log('No additional user data found');
                    }
                });
        })
        .catch((error)=>{
            const errorCode=error.code;
            const errorMessage=error.message;
            console.error('Error during login:',errorCode,errorMessage);
        });
}
