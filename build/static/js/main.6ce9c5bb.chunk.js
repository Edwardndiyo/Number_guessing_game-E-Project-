(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,,,function(e,a,t){e.exports=t.p+"static/media/Rpg_Dice_Drawing.6363a051.jpg"},,,function(e,a,t){e.exports=t.p+"static/media/717fd4d6f85a77a6eaebc9eec0dfcd69.e9ccc883.jpg"},function(e,a,t){e.exports=t(39)},,,,,,,,function(e,a,t){},function(e,a,t){},function(e,a,t){},,,,,function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),r=t(14),c=t.n(r),o=(t(24),t(5)),m=t(3);const s=Object(n.createContext)(),u=e=>{let{children:a}=e;const[t,r]=Object(n.useState)(!1),[c,o]=Object(n.useState)(null),[m,u]=Object(n.useState)(!0);Object(n.useEffect)(()=>{const e=localStorage.getItem("username");e&&(o(e),r(!0)),u(!1)},[]);return l.a.createElement(s.Provider,{value:{isAuthenticated:t,username:c,login:e=>{o(e),r(!0),localStorage.setItem("username",e)},logout:()=>{o(null),r(!1),localStorage.removeItem("username")},loading:m}},a)};var i=t(6);t(25);var d=()=>{const{theme:e,toggleTheme:a}=Object(n.useContext)(P),{isAuthenticated:t,username:r,logout:c}=Object(n.useContext)(s),[m,u]=Object(n.useState)(!1),d=()=>{u(!1)};return l.a.createElement("nav",{className:"navbar ".concat(e)},l.a.createElement("div",{className:"navbar-left"},l.a.createElement("h1",{className:"logo"},"Diced")),l.a.createElement("div",{className:"hamburger",onClick:()=>{u(!m)}},m?l.a.createElement(i.g,null):l.a.createElement(i.b,null)),l.a.createElement("ul",{className:"navbar-center ".concat(m?"open":"")},l.a.createElement("li",null,l.a.createElement(o.b,{to:"/",onClick:d},"Home")),l.a.createElement("span",{className:"separator"}),l.a.createElement("li",null,l.a.createElement(o.b,{to:"/game",onClick:d},"Game")),l.a.createElement("span",{className:"separator"}),l.a.createElement("li",null,l.a.createElement(o.b,{to:"/profile",onClick:d},"Profile")),l.a.createElement("span",{className:"separator"}),l.a.createElement("li",null,l.a.createElement(o.b,{to:"/leaderboard",onClick:d},"Leaderboard")),l.a.createElement("span",{className:"separator"}),l.a.createElement("li",null,l.a.createElement(o.b,{to:"/contact",onClick:d},"Contact Us")),l.a.createElement("button",{onClick:a,className:"theme-toggle ".concat(e)},"light"===e?l.a.createElement(i.e,{size:30}):l.a.createElement(i.f,{size:35}))))},E=t(40);t(26);var p=()=>{const{theme:e}=Object(n.useContext)(P),{username:a}=Object(n.useContext)(s),[t,r]=Object(n.useState)({username:a||"",email:"",feedback:""}),c=e=>{const{name:a,value:t}=e.target;r(e=>({...e,[a]:t}))};return l.a.createElement("footer",{className:"footer ".concat(e)},l.a.createElement("div",{className:"footer-container"},l.a.createElement("div",{className:"feedback-section"},l.a.createElement("h3",null," ",a,", LEAVE A FEEDBACK"),l.a.createElement("form",{onSubmit:async e=>{e.preventDefault();try{const e=await E.a.post(" https://edwardndiyoo.pythonanywhere.com/feedback",t);alert(e.data.message),r({username:a||"",email:"",feedback:""})}catch(n){console.error(n),alert("An error occurred while submitting feedback.")}}},l.a.createElement("input",{type:"text",name:"username",placeholder:"Username",value:t.username,onChange:c,required:!0,readOnly:!0}),l.a.createElement("textarea",{name:"feedback",placeholder:"Comment",value:t.feedback,onChange:c,required:!0}),l.a.createElement("button",{type:"submit"},"Submit"))),l.a.createElement("div",{className:"separators"}),l.a.createElement("div",{className:"links-section"},l.a.createElement("div",{className:"links"},l.a.createElement(o.b,{to:"/"},"Home"),l.a.createElement(o.b,{to:"/game"},"Game"),l.a.createElement(o.b,{to:"/profile"},"Profile"),l.a.createElement(o.b,{to:"/leaderboard"},"Leaderboard"),l.a.createElement(o.b,{to:"/contact"},"Contact Us")),l.a.createElement("div",{className:"social-links"},l.a.createElement("a",{href:"https://github.com/Edwardndiyo",target:"_blank",rel:"noopener noreferrer"},l.a.createElement(i.c,{size:30})," "),l.a.createElement("a",{href:"https://linkedin.com/in/edward-ndiyo-a349b918b",target:"_blank",rel:"noopener noreferrer"},l.a.createElement(i.d,{size:30})," "),l.a.createElement("a",{href:"https://twitter.com/@_ed__Ward_",target:"_blank",rel:"noopener noreferrer"},l.a.createElement(i.h,{size:30})," "),l.a.createElement("a",{href:"https://wa.me/08073342004",target:"_blank",rel:"noopener noreferrer"},l.a.createElement(i.i,{size:30})," ")),l.a.createElement("div",{className:"contact-info"},l.a.createElement("p",null,"Email: ",l.a.createElement("a",{href:"mailto:Ndiyoedward@gmail.com"},"Ndiyoedward@gmail.com")),l.a.createElement("p",null,"Phone: ",l.a.createElement("a",{href:"tel:+2348073342004"},"08073342004"))))))},h=t(15),g=t.n(h),b=t(12),f=t.n(b);t(31);var y=()=>{const{theme:e}=Object(n.useContext)(P),{username:a}=Object(n.useContext)(s),[t,r]=Object(n.useState)([]),[c,m]=Object(n.useState)(0);return Object(n.useEffect)(()=>{fetch(" https://edwardndiyoo.pythonanywhere.com/get_feedbacks").then(e=>e.json()).then(e=>r(e)).catch(e=>console.error("Error fetching feedbacks:",e))},[]),Object(n.useEffect)(()=>{const e=setInterval(()=>{m(e=>(e+1)%t.length)},5e3);return()=>clearInterval(e)},[t]),l.a.createElement("div",{className:"homepage ".concat(e)},l.a.createElement("section",{className:"hero"},l.a.createElement("h1",null,"Welcome, ",a),l.a.createElement("h2",null,"Guess the Number !!"),l.a.createElement("p",null,"Think you can guess the number? Put your skills to the test!"),l.a.createElement(o.b,{to:"/game",className:"cta-button"},"Play Now")),l.a.createElement("section",{className:"description"},l.a.createElement("div",{className:"header-design"},l.a.createElement("div",{className:"line top"}),"ABOUT THE GAME",l.a.createElement("div",{className:"line bottom"})),l.a.createElement("div",{className:"card"},l.a.createElement("img",{src:g.a,alt:"About the Game",className:"hero-image"}),l.a.createElement("p",null,"The Number Guessing Game is a fun and challenging game where you try to guess a randomly generated number within a certain range. The fewer guesses you make, the higher your score!"))),l.a.createElement("section",{className:"how-to-play"},l.a.createElement("div",{className:"header-design"},l.a.createElement("div",{className:"line top"}),"How to Play",l.a.createElement("div",{className:"line bottom"})),l.a.createElement("div",{className:"card how-to-play-card"},l.a.createElement("div",{className:"how-to-play-content"},l.a.createElement("p",null,"1. Choose a difficulty level.",l.a.createElement("br",null)," ",l.a.createElement("br",null),"2. The system will generate a random number within the range.",l.a.createElement("br",null),"3. Enter your guess and click 'Submit'.",l.a.createElement("br",null)," ",l.a.createElement("br",null),"4. Receive hints to help you guess the correct number.",l.a.createElement("br",null)," ",l.a.createElement("br",null),"5. Continue guessing until you find the correct number. ",l.a.createElement("br",null)," ",l.a.createElement("br",null),"6. Save your score to compete with players globally"),l.a.createElement("img",{src:f.a,alt:"How to Play",className:"how-to-play-image"})))),l.a.createElement("section",{className:"features"},l.a.createElement("div",{className:"header-design"},l.a.createElement("div",{className:"line top"}),"GAME FEATURES",l.a.createElement("div",{className:"line bottom"})),l.a.createElement("div",{className:"card features-container"},l.a.createElement("div",{className:"feature-card leaderboard"},l.a.createElement("div",{className:"feature-overlay"},l.a.createElement("h3",null,"LEADERBOARD"),l.a.createElement("p",null,"Compete with players around the world and see your rank on the global leaderboard."))),l.a.createElement("div",{className:"feature-card difficulty"},l.a.createElement("div",{className:"feature-overlay"},l.a.createElement("h3",null,"DIFFICULTY LEVELS"),l.a.createElement("p",null,"Choose different difficulty levels to match your skill. Start easy and work your way up to Pro!"))))),l.a.createElement("section",{className:"feedback"},l.a.createElement("div",{className:"header-design"},l.a.createElement("div",{className:"line top"}),"User Feedback",l.a.createElement("div",{className:"line bottom"})),l.a.createElement("div",{className:"card feedback-container"},l.a.createElement("div",{className:"feedback-inner",style:{transform:"translateX(-".concat(33.33*c,"%)")}},t.concat(t).map((e,a)=>l.a.createElement("div",{key:a,className:"feedback-card"},l.a.createElement("h3",null,e.name),l.a.createElement("p",null,e.comment)))))))};t(32);const v={beginner:{range:100,scoreIncrement:5,penalty:5},amateur:{range:1e3,scoreIncrement:10,penalty:10},pro:{range:1e4,scoreIncrement:15,penalty:15}},w=e=>Math.floor(Math.random()*e);var N=()=>{const{theme:e}=Object(n.useContext)(P),{username:a}=Object(n.useContext)(s),[t,r]=Object(n.useState)(null),[c,o]=Object(n.useState)(null),[u,i]=Object(n.useState)(0),[d,p]=Object(n.useState)(""),[h,g]=Object(n.useState)({beginner:0,amateur:0,pro:0,total:0}),[b,f]=Object(n.useState)([]),[y,N]=Object(n.useState)(""),[S,C]=Object(n.useState)(!1),[k,j]=Object(n.useState)(0),[O,x]=Object(n.useState)(!1),[_,A]=Object(n.useState)(!0),F=Object(m.p)();Object(n.useEffect)(()=>{(async()=>{if(a)try{const t=await E.a.get(" https://edwardndiyoo.pythonanywhere.com/get_highest_score/".concat(a));j(t.data.highestScore||0)}catch(e){console.error("Error fetching highest score:",e)}})()},[a]);const I=e=>{const a=w(v[e].range);r(e),o(a),i(0),p(""),C(!1),A(!0),T(a,v[e].range)},T=(e,a)=>{const t=new Set;for(t.add(e);t.size<8;)t.add(w(a));f(Array.from(t).sort(()=>Math.random()-.5))},U=()=>{r(null),o(null),i(0),p(""),f([]),C(!1),A(!0)};return l.a.createElement("div",{className:"game-page ".concat(e)},l.a.createElement("div",{className:"highest-score"},l.a.createElement("p",null,a,"'s Highest Score: ",k)),null===t?l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",{className:"bounce "},"Select Difficulty level"),l.a.createElement("div",{className:"difficulty-selection"},l.a.createElement("button",{onClick:()=>I("beginner"),className:"beginner"},"Beginner (0-99)"),l.a.createElement("button",{onClick:()=>I("amateur"),className:"amateur"},"Amateur (0-999)"),l.a.createElement("button",{onClick:()=>I("pro"),className:"pro"},"Pro (0-9999)"),l.a.createElement("p",null,"Beginner Score: ",h.beginner,", Amateur Score: ",h.amateur,", Pro Score: ",h.pro),l.a.createElement("p",null,"Total Score: ",h.total),O&&l.a.createElement("button",{className:"end-game-button",onClick:async()=>{try{const t=(await E.a.get(" https://edwardndiyoo.pythonanywhere.com/get_highest_score/".concat(a))).data.highestScore||0;h.total>t&&await E.a.post(" https://edwardndiyoo.pythonanywhere.com/update_scores",{username:a,beginner:h.beginner,amateur:h.amateur,pro:h.pro,totalscore:h.total}),await E.a.post(" https://edwardndiyoo.pythonanywhere.com/update_player_history",{username:a,beginner:h.beginner,amateur:h.amateur,pro:h.pro,totalscore:h.total}),g({beginner:0,amateur:0,pro:0,total:0}),x(!1),F("/game")}catch(e){console.error("Error handling end game:",e)}}},"End Game"))):l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null,"Guess the number within ",t," Level"),l.a.createElement("div",{className:"gameplay"},l.a.createElement("p",null,"Guess a number between 0 and ",v[t].range-1),l.a.createElement("div",{className:"hint-system"},l.a.createElement("p",null,d)),l.a.createElement("div",{className:"number-buttons"},b.map((e,a)=>l.a.createElement("button",{key:a,className:"number-button",onClick:()=>(e=>{if(_)if(i(u+1),x(!0),e===c){const e=h[t]+v[t].scoreIncrement;g({...h,[t]:e,total:h.total+v[t].scoreIncrement}),N("You guessed right!"),C(!0),A(!1),setTimeout(U,2e3)}else if(p(e>c?"It is lower":"It is higher"),u>=9){N("You are out of trials!"),C(!0),A(!1);const e=v[t].penalty,a=Math.max(0,h.beginner-e),n=Math.max(0,h.amateur-e),l=Math.max(0,h.pro-e);g({beginner:a,amateur:n,pro:l,total:Math.max(0,a+n+l)}),setTimeout(U,2e3)}else T(c,v[t].range)})(e),disabled:!_},e))),l.a.createElement("p",null,"Trials: ",u,"/10"),l.a.createElement("div",null,l.a.createElement("p",null,"Beginner Score: ",h.beginner,", Amateur Score: ",h.amateur,", Pro Score: ",h.pro)),l.a.createElement("p",null,"Total Score: ",h.total))),S&&l.a.createElement("div",{className:"message-box"},l.a.createElement("p",null,y)))};t(33);var S=()=>{const{theme:e}=Object(n.useContext)(P),{isAuthenticated:a,logout:t}=Object(n.useContext)(s),[r,c]=Object(n.useState)({full_name:"",email:"",number:"",username:"",password:""}),[m,u]=Object(n.useState)([]),[d,p]=Object(n.useState)(!1),[h,g]=Object(n.useState)({oldPassword:"",newPassword:"",confirmPassword:""}),[b,f]=Object(n.useState)("");Object(n.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("username"),a=await E.a.get(" https://edwardndiyoo.pythonanywhere.com/get_profile/".concat(e));c(a.data)}catch(b){console.error("Error fetching profile data:",b)}})()},[]),Object(n.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("username"),a=await E.a.get(" https://edwardndiyoo.pythonanywhere.com/get_game_records/".concat(e));u(a.data)}catch(b){console.error("Error fetching profile data:",b)}})()},[]);const y=e=>{const{name:a,value:t}=e.target;c(e=>({...e,[a]:t}))},v=e=>{const{name:a,value:t}=e.target;g(e=>({...e,[a]:t}))};return l.a.createElement("div",{className:"profile-page ".concat(e," ").concat(d?"editing":"")},l.a.createElement("div",{className:"navbarss"},l.a.createElement("div",{className:"navbar-left"},l.a.createElement("h1",{className:"bounce "},"User Profile")),l.a.createElement("div",{className:"navbar-right"},a?l.a.createElement("button",{onClick:t,className:"logout-button"},"Logout"):l.a.createElement(o.b,{to:"/login"},"Logout"))),l.a.createElement("div",{className:"content"},l.a.createElement("div",{className:"profile-card ".concat(d?"centered":""," position-relative")},l.a.createElement("div",{className:"top-header"},l.a.createElement("h2",null,"Registration Details"),d&&l.a.createElement(i.a,{className:"back-button",onClick:()=>{p(!1)}})," "),d?l.a.createElement(l.a.Fragment,null,l.a.createElement("input",{type:"text",name:"full_name",placeholder:"Full Name",value:r.full_name,onChange:y}),l.a.createElement("input",{type:"email",name:"email",placeholder:"Email",value:r.email,onChange:y}),l.a.createElement("input",{type:"password",name:"oldPassword",placeholder:"Old Password",value:h.oldPassword,onChange:v}),l.a.createElement("input",{type:"password",name:"newPassword",placeholder:"New Password",value:h.newPassword,onChange:v}),l.a.createElement("input",{type:"password",name:"confirmPassword",placeholder:"Confirm New Password",value:h.confirmPassword,onChange:v}),l.a.createElement("input",{type:"text",name:"number",placeholder:"Phone",value:r.number,onChange:y}),l.a.createElement("button",{type:"submit",className:"save-button",onClick:async()=>{if(d){if(h.newPassword!==h.confirmPassword)return void f("New passwords do not match");try{const e=localStorage.getItem("username");(await E.a.post(" https://edwardndiyoo.pythonanywhere.com/update_profile",{...r,username:e,oldPassword:h.oldPassword,newPassword:h.newPassword})).data.success?(p(!1),localStorage.setItem("formData",JSON.stringify(r)),f("")):f("Update failed. Please check your old password.")}catch(b){console.error("Error saving profile data:",b),f("Update failed. Please try again.")}}else p(!0)}},"Save")):l.a.createElement(l.a.Fragment,null,l.a.createElement("p",null,l.a.createElement("strong",null,"Full Name:   ")," ",l.a.createElement("span",null,r.full_name)),l.a.createElement("p",null,l.a.createElement("strong",null,"Username:   ")," ",l.a.createElement("span",null,r.username)),l.a.createElement("p",null,l.a.createElement("strong",null,"Email:   ")," ",l.a.createElement("span",null,r.email)),l.a.createElement("p",null,l.a.createElement("strong",null,"Phone:   ")," ",l.a.createElement("span",null,r.number)),l.a.createElement("button",{onClick:()=>{p(!0)},className:"edit-button"},"Edit")),b&&l.a.createElement("p",{className:"error-message"},b)),!d&&l.a.createElement("div",{className:"game-records-card position-relative"},l.a.createElement("div",{className:"top-header"},l.a.createElement("h2",null,"Game Records")),l.a.createElement("div",{className:"scrollable-table"},l.a.createElement("table",null,l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Date"),l.a.createElement("th",null,"Beginner"),l.a.createElement("th",null,"Amateur"),l.a.createElement("th",null,"Pro"),l.a.createElement("th",null,"Total"))),l.a.createElement("tbody",null,m.length>0?m.map((e,a)=>l.a.createElement("tr",{key:a},l.a.createElement("td",null,e.date),l.a.createElement("td",null,e.beginner),l.a.createElement("td",null,e.amateur),l.a.createElement("td",null,e.pro),l.a.createElement("td",null,e.total))):l.a.createElement("tr",null,l.a.createElement("td",{colSpan:"5"},"No game records found."))))))))};t(34);var C=()=>{const{theme:e}=Object(n.useContext)(P),[a,t]=Object(n.useState)([]);Object(n.useEffect)(()=>{r()},[]);const r=async()=>{try{const a=await fetch(" https://edwardndiyoo.pythonanywhere.com/get_leaderboard"),n=await a.json();t(n)}catch(e){console.error("Error fetching leaderboard data:",e)}},c=a.sort((e,a)=>a.totalScore-e.totalScore).map((e,a)=>({...e,rank:a+1}));return l.a.createElement("div",{className:"leaderboard-page ".concat(e)},l.a.createElement("h1",{className:"bounce"},"Global Leadership Board"),l.a.createElement("table",{className:"leaderboard-table ".concat(e)},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Rank"),l.a.createElement("th",null,"Username"),l.a.createElement("th",null,"Beginner"),l.a.createElement("th",null,"Amateur"),l.a.createElement("th",null,"Pro"),l.a.createElement("th",null,"Total Score"))),l.a.createElement("tbody",null,c.map(e=>l.a.createElement("tr",{key:e.username},l.a.createElement("td",{"data-label":"Rank"},e.rank),l.a.createElement("td",{"data-label":"Username"},e.username),l.a.createElement("td",{"data-label":"Beginner"},e.beginnerScore),l.a.createElement("td",{"data-label":"Amateur"},e.amateurScore),l.a.createElement("td",{"data-label":"Pro"},e.proScore),l.a.createElement("td",{"data-label":"Total Score"},e.totalScore))))))};t(35);var k=()=>{const{theme:e}=Object(n.useContext)(P),[a,t]=Object(n.useState)({name:"",email:"",message:""}),r=e=>{const{name:a,value:n}=e.target;t(e=>({...e,[a]:n}))};return l.a.createElement("div",{className:"contact-us-page ".concat(e)},l.a.createElement("h1",{className:"bounce"},"Contact Us"),l.a.createElement("div",{className:"card-container"},l.a.createElement("div",{className:"contact-form card"},l.a.createElement("h2",null,"Like this project? Contact the developer!"),l.a.createElement("form",{onSubmit:async e=>{e.preventDefault();const n="Hello Edward, I am ".concat(a.name," with email address ").concat(a.email,". I just checked out your application and I liked it. Here's my message - ").concat(a.message,".");"https://wa.me/2348073342004?text=".concat(encodeURIComponent(n));try{const e=await E.a.post("https://edwardndiyoo.pythonanywhere.com/contact",a);alert(e.data.message)}catch(l){console.error("Error:",l),alert("An error occurred while submitting your message.")}t({name:"",email:"",message:""})}},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"name"},"Name:"),l.a.createElement("input",{type:"text",id:"name",name:"name",value:a.name,onChange:r,required:!0})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"email"},"Email:"),l.a.createElement("input",{type:"email",id:"email",name:"email",value:a.email,onChange:r,required:!0})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"message"},"Message:"),l.a.createElement("textarea",{id:"message",name:"message",value:a.message,onChange:r,required:!0})),l.a.createElement("button",{type:"submit"},"Submit"))),l.a.createElement("div",{className:"details-card card"},l.a.createElement("img",{src:f.a,alt:"Developer"}),l.a.createElement("p",null,"This App was developed by Edward Ndiyo, Student of APTECH.",l.a.createElement("br",null)," The technologies Employed here are REACT, MySQL and ",l.a.createElement("br",null)," Flask (Python). if you liked this project do well to contact the ",l.a.createElement("br",null),"developer and leave an awesome feedback ! thank you"),l.a.createElement("p",null,l.a.createElement("i",{className:"fas fa-envelope"})," Ndiyoedward@gmail.com"),l.a.createElement("p",null,l.a.createElement("i",{className:"fas fa-phone"})," 08073342004"))))};t(36);var j=()=>{const[e,a]=Object(n.useState)({username:"",password:""}),{login:t}=Object(n.useContext)(s),r=Object(m.p)(),c=e=>{const{name:t,value:n}=e.target;a(e=>({...e,[t]:n}))};return l.a.createElement("div",{className:"login-card"},l.a.createElement("div",{className:"login-page"},l.a.createElement("h1",null,"Login"),l.a.createElement("form",{onSubmit:async a=>{a.preventDefault();try{const a=await E.a.post("https://edwardndiyoo.pythonanywhere.com/login",e);console.log(a.data),a.data.success?(t(e.username),alert("Login successful"),r("/")):alert("Invalid credentials")}catch(n){console.error(n),alert("Invalid credentials")}}},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"username"},"Username:"),l.a.createElement("input",{type:"text",id:"username",name:"username",value:e.username,onChange:c,required:!0})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"password"},"Password:"),l.a.createElement("input",{type:"password",id:"password",name:"password",value:e.password,onChange:c,required:!0})),l.a.createElement("button",{type:"submit"},"Login")),l.a.createElement("p",null,"Don't have an account? ",l.a.createElement(o.b,{to:"/signup"},"Sign Up"))))};t(37);var O=()=>{const[e,a]=Object(n.useState)({full_name:"",email:"",number:"",username:"",password:""}),t=Object(m.p)(),r=e=>{const{name:t,value:n}=e.target;a(e=>({...e,[t]:n}))};return l.a.createElement("div",{className:"signup-card"},l.a.createElement("div",{className:"signup-page"},l.a.createElement("h1",null,"Sign Up"),l.a.createElement("form",{onSubmit:async n=>{n.preventDefault();try{const a=await E.a.post(" https://edwardndiyoo.pythonanywhere.com/signup",e);console.log(a.data),a.data.success?(alert("User registered successfully"),t("/login")):alert("Error registering user")}catch(l){console.error(l),alert("Error registering user")}a({full_name:"",email:"",number:"",username:"",password:""})}},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"full_name"},"Full Name:"),l.a.createElement("input",{type:"text",id:"full_name",name:"full_name",value:e.full_name,onChange:r,required:!0})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"email"},"Email:"),l.a.createElement("input",{type:"email",id:"email",name:"email",value:e.email,onChange:r,required:!0})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"number"},"Number:"),l.a.createElement("input",{type:"text",id:"number",name:"number",value:e.number,onChange:r})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"username"},"Username:"),l.a.createElement("input",{type:"text",id:"username",name:"username",value:e.username,onChange:r,required:!0})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"password"},"Password:"),l.a.createElement("input",{type:"password",id:"password",name:"password",value:e.password,onChange:r,required:!0})),l.a.createElement("button",{type:"submit"},"Sign Up")),l.a.createElement("p",null,"Already have an account? ",l.a.createElement(o.b,{to:"/login"},"Login"))))};t(38);const P=Object(n.createContext)(),x=()=>{const[e,a]=Object(n.useState)("light"),{isAuthenticated:t,loading:r}=Object(n.useContext)(s);return Object(n.useEffect)(()=>{document.body.className=e},[e]),r?l.a.createElement("div",null,"Loading..."):l.a.createElement(P.Provider,{value:{theme:e,toggleTheme:()=>{a(e=>"light"===e?"dark":"light")}}},l.a.createElement("div",{className:"App ".concat(e)},l.a.createElement(o.a,null,l.a.createElement(d,null),l.a.createElement(m.d,null,l.a.createElement(m.b,{path:"/",element:t?l.a.createElement(y,null):l.a.createElement(m.a,{to:"/login"})}),l.a.createElement(m.b,{path:"/game",element:t?l.a.createElement(N,null):l.a.createElement(m.a,{to:"/login"})}),l.a.createElement(m.b,{path:"/profile",element:t?l.a.createElement(S,null):l.a.createElement(m.a,{to:"/login"})}),l.a.createElement(m.b,{path:"/leaderboard",element:t?l.a.createElement(C,null):l.a.createElement(m.a,{to:"/login"})}),l.a.createElement(m.b,{path:"/contact",element:t?l.a.createElement(k,null):l.a.createElement(m.a,{to:"/login"})}),l.a.createElement(m.b,{path:"/signup",element:l.a.createElement(O,null)}),l.a.createElement(m.b,{path:"/login",element:l.a.createElement(j,null)})),l.a.createElement(p,null))))};var _=()=>l.a.createElement(u,null,l.a.createElement(x,null));var A=e=>{e&&e instanceof Function&&t.e(3).then(t.bind(null,41)).then(a=>{let{getCLS:t,getFID:n,getFCP:l,getLCP:r,getTTFB:c}=a;t(e),n(e),l(e),r(e),c(e)})};c.a.createRoot(document.getElementById("root")).render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(_,null))),A()}],[[16,1,2]]]);
//# sourceMappingURL=main.6ce9c5bb.chunk.js.map