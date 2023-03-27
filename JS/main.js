document.getElementById("send").setAttribute("data-id", "");
document.getElementById("cancel_edit").setAttribute("data-id", "");
const date = new Date();
const dd = String(date.getDate()).padStart(2, '0');
const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = date.getFullYear();
const currentDate =   dd + '-'+ mm + '-' + yyyy;
const time = date.getHours() + ":" + date.getMinutes();
const maxMessageLength = 8000;
const minMessageLength = 5;
var user_ip = "";
const textarea = document.getElementById("message");
var user_ip_enc = null;
var latestDocument = null;
const contentHolderDOM = document.getElementById("content");
const maxDataFetch = 4;
const extraScroll = 0; //of no use as of now
document.getElementById("sword_count").innerHTML += " "+maxMessageLength; //SETS THE MAX-MESSAGE-LENGTH TEXT TO DOM

var firebaseConfig = {
    apiKey: "AIzaSyAoDG4yzNRMtwc9YDg-V2OEHy3yFRihkbc",
    authDomain: "secrets-1c931.firebaseapp.com",
    projectId: "secrets-1c931",
    storageBucket: "secrets-1c931.appspot.com",
    messagingSenderId: "936478406677",
    appId: "1:936478406677:web:be5485b654f966ab03b61c"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();



//CHECKS IF ANYTHING IS IN DRAFT 
if(localStorage.getItem("draft_message") == undefined)
{
  localStorage.setItem("draft_message", ""); //clears draft if draft is undefined -- for new users
}
else if(localStorage.getItem("draft_message") == " ")
{
  localStorage.setItem("draft_message", ""); //clears draft if draft has only whitespaces
}
else
{
  document.getElementById("message").value = localStorage.getItem("draft_message"); //if draft has content it changes the contents of the placeholder.
}




  //HANDLES ALL THE ALGORITHMS OF THE ENTIRE MESSAGE INPUT
  // INPUT SIZE CHANGE
  //PASTE, CHANGE, KEYDOWN, KEYUP, INPUT TRIGGER COMMANDS
  //SETS VALUE FROM DRAFT IF EXISTS
  textarea.focus();
  ["change","input","paste","keydown","keyup"].forEach(function(evt){
    textarea.addEventListener(evt, function(e) {
      localStorage.setItem("draft_message", textarea.value.trim()); //SETS VALUE TO DRAFT FROM PLACEHOLDER...

      //..SHOWS THAT AUTOSAVE IS ACTIVE
      document.getElementById("autoSave").classList.toggle("active");
      setTimeout(() => {
        document.getElementById("autoSave").classList.toggle("active");
      }, 800);
      //..UPDATES THE LENGTH OF INPUT
      document.getElementById("dword_count").classList.toggle("active");
      setTimeout(() => {
        document.getElementById("dword_count").classList.toggle("active");
      }, 800);
      length_val = document.getElementById("message").value.length;
      document.getElementById("dword_count").innerHTML = (length_val < 10) ? "000"+length_val :  (length_val < 100) ? "00"+length_val : (length_val < 1000) ? "0"+length_val : length_val ;
      length_val >= maxMessageLength ? (document.getElementById("dword_count").style.color = "red") : document.getElementById("dword_count").style.color = "white";
      length_val <= minMessageLength ? (document.getElementById("dword_count").style.color = "red") : document.getElementById("dword_count").style.color = "white";

      
    //...EXPANDS THE HEIGHT OF THE PLACEHOLDER ALONG WITH INCREASE IN CONTENT ONLY IF THE PLACEHOLDER IS NOT EXPANDED TO MAX HEIGHT
    if(document.getElementById("expand_message").classList.contains("active") == false)
    {
      this.style.height = "auto";
      this.style.height = (this.scrollHeight) + "px";
    
      if(this.style.height == "64px")
      {
        this.style.top = "-8px";
      }
      else if(this.style.height == "94px")
      {
        this.style.top = "-38px";
      }
      else if(this.style.height == "124px")
      {
        this.style.top = "-70px";
      }
      else if(this.style.height == "154px")
      {
        this.style.top = "-100px";
      }
      else
      {
        this.style.height = "154px"
      }
    }

    //IF THE PLACEHOLDER EXPAND COMMAND IS GIVEN, AUTO RESIZE IS STOPPED AND HEIGHT IS CHANGED AUTOMATICALLY TO MAX
    else if (document.getElementById("expand_message").classList.contains("active") == true) 
    {
      
      // document.getElementById("message").classList.toggle("active");
      document.getElementById("message").style.height = "600px";
      document.getElementById("message").style.maxHeight = "600px";
      document.getElementById("message").style.top = "-550px";
    }
    //IF THE PLACEHOLDER EXPAND COMMAND IS GIVEN, HEIGHT IS CHANGED AUTOMATICALLY TO MAX
    else
    {
      document.getElementById("expand_message").classList.toggle("active");
      document.getElementById("message").style.height = "600px";
      document.getElementById("message").style.maxHeight = "600px";
      document.getElementById("message").style.top = "-550px";
    }
    });
  })
  
// ALGORITHM TO EXPAND THE MESSAGE TEXTAREA
document.getElementById("expand_message").addEventListener("click", () => {
  
  if(document.getElementById("expand_message").classList.contains("active"))
  {
    document.getElementById("expand_message").classList.toggle("active");
    // document.getElementById("message").classList.toggle("active");
    document.getElementById("message").style.height = "55px";
    document.getElementById("message").style.maxHeight = "154px";
    document.getElementById("message").style.top = "0px";
  }

  else
  {
    if(document.getElementById("message").value != "")
    {
      document.getElementById("expand_message").classList.toggle("active");
    // document.getElementById("message").classList.toggle("active");
    document.getElementById("message").style.height = "600px";
    document.getElementById("message").style.maxHeight = "600px";
    document.getElementById("message").style.top = "-550px";
    }
    else
    {

      document.getElementById("expand_message").classList.toggle("active")
      setTimeout(() => {
        document.getElementById("expand_message").classList.toggle("active")
      }, 200);
    }
    
  }
  
  
})
//FUNCTION TO TRIGGER EXPANDING MESSAGE TEXTAREA
function expand_message_func()
{
  if(document.getElementById("expand_message").classList.contains("active"))
  {
    document.getElementById("expand_message").classList.toggle("active");
    // document.getElementById("message").classList.toggle("active");
    document.getElementById("message").style.height = "55px";
    document.getElementById("message").style.maxHeight = "154px";
    document.getElementById("message").style.top = "0px";
  }

  else
  {
    if(document.getElementById("message").value != "")
    {
      document.getElementById("expand_message").classList.toggle("active");
    // document.getElementById("message").classList.toggle("active");
    document.getElementById("message").style.height = "600px";
    document.getElementById("message").style.maxHeight = "600px";
    document.getElementById("message").style.top = "-550px";
    }
    else
    {

      document.getElementById("expand_message").classList.toggle("active")
      setTimeout(() => {
        document.getElementById("expand_message").classList.toggle("active")
      }, 200);
    }
    
  }
}
// ========================================================================MAIN==========================================================================================
// MAIN -- GETS API, CHECKS IF THE ENTER KEY OR SEND BUTTON IS PRESSED, COMMUNICATES WITH THE SERVER
//CONTAINS -- 

//
//
//
//
//
//

$.getJSON("https://api.ipify.org?format=json", function(data) {
alph = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
if(localStorage.getItem("uid") == undefined)        
{
        user_ip = String(data.ip);
        localStorage.setItem("uid", user_ip);
        console.log(user_ip)
}


      setInterval(() => {  // DOES ALL THE FUNCTIONS WHICH NEEDS LOOPING IN THE WHILE PROGRAM

        //KEEPS A CHECK ON THE LENGTH OF THE MESSAGE INPUT
        length_val = document.getElementById("message").value.length;
        document.getElementById("dword_count").innerHTML = (length_val < 10) ? "000"+length_val :  (length_val < 100) ? "00"+length_val : (length_val < 1000) ? "0"+length_val : length_val ;
        length_val >= maxMessageLength ? (document.getElementById("dword_count").style.color = "red") : document.getElementById("dword_count").style.color = "white";
        length_val <= minMessageLength ? (document.getElementById("dword_count").style.color = "red") : document.getElementById("dword_count").style.color = "white";

        if (document.getElementById("send").getAttribute("data-id") == "") //CHECKS IF THE OPERATION IS EDIT OR SEND.
        {
          // IF NORMAL SEND THEN THE MAXLENGTH, LENGTHS ARE UPDATED, SAME ALGORITHM TO PREVENT DATA LESSER THAN MIN ND VICE VERSA FROM BEING SENT, CHANGES COLOR OF THE CORRESPONDING CONTROLS
          if(document.getElementById("send").classList.contains("deactivated"))
          {
            document.getElementById("send").style.color = "#ffd800";
          }
          else //checks for the length of the text only if there is internet connection
          {
          if((document.getElementById("message").value.length >= maxMessageLength) ||  (document.getElementById("message").value.length <= minMessageLength))
          {
            document.getElementById("send").style.color = "red";
          }
          else
          {
            document.getElementById("send").style.color = "#fff";
          }
        }
        }
        else //OPERATION IS EDIT
        // IF EDIT THEN THE MAXLENGTH, LENGTHS ARE UPDATED, SAME ALGORITHM TO PREVENT DATA LESSER THAN MIN ND VICE VERSA FROM BEING SENT, CHANGES COLOR OF THE CORRESPONDING CONTROLS
        {
          if(document.getElementById("send").classList.contains("deactivated"))
          {
            document.getElementById("send").style.color = "#ffd800";
          }
          else //checks for the length of the text only if there is internet connection
          {
          if((document.getElementById("message").value.length >= maxMessageLength) ||  (document.getElementById("message").value.length <= minMessageLength))
          {
            document.getElementById("send").style.color = "red";
          }
          else
          {
            document.getElementById("send").style.color = "#00d13f";
            document.getElementById("cancel_edit").classList.add("active");
          }
        }
        }
        window.scrollTo({top: 0, behavior: 'smooth'});
        if(document.getElementById("message").value == "")
        {
          document.getElementById("message").style.height = "55px";
          document.getElementById("message").style.maxHeight = "154px";
          document.getElementById("message").style.top = "0px";
        (document.getElementById("expand_message").classList.contains("active") ? document.getElementById("expand_message").classList.remove("active") : null)
          
          
        }

      },100)

   


    
      document.getElementById("cancel_edit").addEventListener("click" ,() => { //USER CANCELS EDIT
        edit_pencil_id = document.getElementById("cancel_edit").getAttribute("data-id");
        document.getElementById("cancel_edit").classList.remove("active");
        document.getElementById("send").setAttribute("data-id", "");
        document.getElementById("cancel_edit").setAttribute("data-id", "");
        document.getElementById("edit_message"+edit_pencil_id).classList.toggle("active"); //change the status of edit pencil
        document.getElementById("message").value = "";
      })


//FUNCTION TO SEND THE MESSAGE TO SERVER BY CLICKING SEND BUTTON
document.getElementById("send").addEventListener("click", (e) => { 
if(document.getElementById("send").classList.contains("deactivated") == false) //CHECKS IF THE BUTTON IS DEACTIVATED OR NOT
{
  if((document.getElementById("message").value.length >= maxMessageLength) ||  (document.getElementById("message").value.length <= minMessageLength))
  {
    document.getElementById("send").classList.toggle("active");
    document.getElementById("dword_count").classList.toggle("active");
    document.getElementById("send").style.color = "red";
        setTimeout(() => {
          document.getElementById("dword_count").classList.toggle("active");
          document.getElementById("send").style.color = "#fff";
          document.getElementById("send").classList.toggle("active");
        }, 800);
  }
  else
  {
    if (document.getElementById("send").getAttribute("data-id") == "") //CHECKS IF THE OPERATION IS EDIT OR SEND.
    {
      user_ip_enc = String(data.ip);
    user_ip_enc = localStorage.getItem("uid").split(".")
    user_ip_enc[0] = String(alph[Math.floor(Math.random() * alph.length)]);
    user_ip_enc[4] = String(alph[Math.floor(Math.random() * alph.length)]);
    user_ip_enc[6] = String(alph[Math.floor(Math.random() * alph.length)]);
    user_ip_enc[9] = String(alph[Math.floor(Math.random() * alph.length)]);
    user_ip_enc = user_ip_enc.join("");


      
      user_message = document.getElementById("message").value;
      if(user_message == "") //checks if the message is empty
      {


      document.getElementById("message").setAttribute("placeholder", "U can't really just send nothing....");
      setTimeout(() => {
        document.getElementById("message").setAttribute("placeholder", "We keep your messages completely anonymous - Express ur heart!");
          
      }, 800);
      }
      else //sending the message to the server
      {
        
        document.getElementById("message_send_loader").style.display = "block";
        user_ip_enc = user_ip_enc;
        timestp = Date.now();
        // console.log(user_message, user_ip_enc, user_ip);
        db.collection('Items').doc( localStorage.getItem("uid")+"-"+timestp).set({
          message : user_message,
          message_id : localStorage.getItem("uid")+"-"+timestp,
          message_id_enc : user_ip_enc,
          type : "message",
          when : currentDate+" at "+time,
          timestamp : timestp,
        })
        document.getElementById("message").value = "";
        document.getElementById("message").style.height = "55px";
        document.getElementById("message").style.top = "0px";
        localStorage.setItem("draft_message", "");
        setTimeout(() => {
          document.getElementById("message_send_loader").style.display = "none";
          contentHolderDOM.scrollTo({ left: 0, top: contentHolderDOM.scrollHeight + extraScroll, behavior: "smooth" });
         }, 800);

        
      }
    }
    else //edit
    {
      
      targetted_data_to_edit = document.getElementById("send").getAttribute("data-id"); //contains the id of the data maps with the server
      user_message = document.getElementById("message").value; 
      timestp = Date.now();
        // console.log(user_message, user_ip_enc, user_ip);
        db.collection('Items').doc(targetted_data_to_edit).update({
          message : user_message,
          
        });
        localStorage.setItem("draft_message", "")
        document.getElementById("message").style.height = "55px";
        document.getElementById("message").style.top = "0px";
        document.getElementById("message").value = "";
        document.getElementById("send").setAttribute("data-id", "");
        document.getElementById("edit_message"+targetted_data_to_edit).classList.toggle("active"); //change the status of edit pencil 
        document.getElementById("cancel_edit").setAttribute("data-id", "");
        document.getElementById("cancel_edit").classList.remove("active");
    }
  } 
}
else // IF THERE'S THE INTERNET CONNECTION THE BUTTON IS GIVEN A TAG OF DEACTIVATED WHICH IS DETECTED HERE AND CHANGES ARE MADE
{
  
  document.getElementById("send").style.color = "#ffd800";
  document.getElementById("message").style.color = "red";
  setTimeout(() => {
    document.getElementById("message").style.color = "#fff";
  }, 1200);
}    
});

//FUNCTION TO SEND THE MESSAGE TO SERVER BY PRESSING ENTER KEY
document.getElementById("message").addEventListener("keydown", (e) => { 
  if(document.getElementById("send").classList.contains("deactivated") == false) //CHECKS IF THE BUTTON IS DEACTIVATED OR NOT
  {
  if ((e.code === "Enter" && !e.shiftKey) || (e.code === "NumpadEnter" && !e.shiftKey)) 
  {
    e.preventDefault();
    if((document.getElementById("message").value.length >= maxMessageLength) ||  (document.getElementById("message").value.length <= minMessageLength))
  {
    document.getElementById("send").classList.toggle("active");
    document.getElementById("dword_count").classList.toggle("active");
    document.getElementById("send").style.color = "red";
        setTimeout(() => {
          document.getElementById("dword_count").classList.toggle("active");
          document.getElementById("send").style.color = "#fff";
          document.getElementById("send").classList.toggle("active");
        }, 800);
  }
  else
  {
    if (document.getElementById("send").getAttribute("data-id") == "") //CHECKS IF THE OPERATION IS EDIT OR SEND.
    {
      user_ip_enc = String(data.ip);
    user_ip_enc = localStorage.getItem("uid").split(".")
    user_ip_enc[0] = String(alph[Math.floor(Math.random() * alph.length)]);
    user_ip_enc[4] = String(alph[Math.floor(Math.random() * alph.length)]);
    user_ip_enc[6] = String(alph[Math.floor(Math.random() * alph.length)]);
    user_ip_enc[9] = String(alph[Math.floor(Math.random() * alph.length)]);
    user_ip_enc = user_ip_enc.join("");
  
  
      // console.log(user_ip, user_ip_enc);
      user_message = document.getElementById("message").value;
      if(user_message == "") //checks if the message is empty
      {
  
  
       document.getElementById("message").setAttribute("placeholder", "U can't really just send nothing....");
       setTimeout(() => {
        document.getElementById("message").setAttribute("placeholder", "We keep your messages completely anonymous - Express ur heart!");
          
       }, 800);
      }
      else //sending the message to the server
      {
        
        document.getElementById("message_send_loader").style.display = "block";
        user_ip_enc = user_ip_enc;
        timestp = Date.now();
        // console.log(user_message, user_ip_enc, user_ip);
        db.collection('Items').doc( localStorage.getItem("uid")+"-"+timestp).set({
          message : user_message,
          message_id : localStorage.getItem("uid")+"-"+timestp,
          message_id_enc : user_ip_enc,
          type : "message",
          when : currentDate+" at "+time,
          timestamp : timestp,
        })
        document.getElementById("message").value = "";
        document.getElementById("message").style.height = "55px";
        document.getElementById("message").style.top = "0px";
        localStorage.setItem("draft_message", "");
        setTimeout(() => {
          document.getElementById("message_send_loader").style.display = "none";
          contentHolderDOM.scrollTo({ left: 0, top: contentHolderDOM.scrollHeight + extraScroll, behavior: "smooth" });
         }, 800);
      }
    }
    else //edit
    {
      
      targetted_data_to_edit = document.getElementById("send").getAttribute("data-id"); //contains the id of the data maps with the server
      user_message = document.getElementById("message").value; 
      timestp = Date.now();
        // console.log(user_message, user_ip_enc, user_ip);
        db.collection('Items').doc(targetted_data_to_edit).update({
          message : user_message,
          
        });
        localStorage.setItem("draft_message", "")
        document.getElementById("message").style.height = "55px";
        document.getElementById("message").style.top = "0px";
        document.getElementById("message").value = "";
        document.getElementById("send").setAttribute("data-id", "");
        document.getElementById("edit_message"+targetted_data_to_edit).classList.toggle("active"); //change the status of edit pencil 
        document.getElementById("cancel_edit").setAttribute("data-id", "");
        document.getElementById("cancel_edit").classList.remove("active");
    }
  } 
  }  
}
else // IF THERE'S THE INTERNET CONNECTION THE BUTTON IS GIVEN A TAG OF DEACTIVATED WHICH IS DETECTED HERE AND CHANGES ARE MADE
{
  

  if ((e.code === "Enter" && !e.shiftKey) || (e.code === "NumpadEnter" && !e.shiftKey)) 
  {
    e.preventDefault();
    document.getElementById("send").style.color = "#ffd800";
    document.getElementById("message").style.color = "red";
    setTimeout(() => {
      document.getElementById("message").style.color = "#fff";
    }, 1200);
  }
  

} 
  });
   



  function DocumentGet()
  {
    
    db.collection("Items").where("type", "==", "message").orderBy("timestamp").startAfter(latestDocument || 0).limit(maxDataFetch)
    .onSnapshot((querySnapshot) => {
      document.getElementById("content").innerHTML = "";
        querySnapshot.forEach((doc) => {
            document.getElementById("message_send_loader").style.display = "block"
             message_id = doc.data().message_id;  //contains the user IP address + timestamp
             message_id = message_id.split("-")[0]; //contains the user IP address
             if(message_id == localStorage.getItem("uid")) //checks if the IP address matches with the user i.e self view
             {
              content_zone = `<div class="content_holding" id="${doc.data().message_id}" name="${doc.data().message_id_enc}">
              <ion-icon name="caret-down"  class="expand_content" id="expand_content" onclick = "content_expand(this)" data-id="${doc.data().message_id_enc}"></ion-icon>
              <ion-icon name="pencil" data-value ="${doc.data().message}" id="edit_message${doc.data().message_id}" data-id= "${doc.data().message_id}" onclick = "edit_content(this)" class="edit_message"></ion-icon>
              <ion-icon name="trash" id="delete_message${doc.data().message_id}" data-id= "${doc.data().message_id}" onclick = "delete_content(this)" class="delete_message"></ion-icon>
              <p id="messsage_timing" class="messsage_timing">${doc.data().when.split("at")[0].trim() == currentDate ?  "Today at"+doc.data().when.split("at")[1]: doc.data().when}</p> 
              <div class="heading"><p class="heading_notes" id="heading_${doc.data().message_id_enc}" name = "p_heading" data-value="${doc.data().message_id_enc}">${doc.data().message_id_enc}</p> <ion-icon name="copy" onclick = "copy_tag(this)" class="copy_tag" id="heading_ico${doc.data().message_id_enc}" data-id="${doc.data().message_id_enc}"></ion-icon> </div>
              <div class="content_info" id="${doc.data().message_id_enc}"><p class="content_notes" id="content_notes${doc.data().message_id_enc}">${doc.data().message}</p></div>
              </div>`
              
             }  
             else
             {
              content_zone = `<div class="content_holding" id="${doc.data().message_id}" name="${doc.data().message_id_enc}">
              <ion-icon name="caret-down" class="expand_content" id="expand_content" onclick = "content_expand(this)" data-id="${doc.data().message_id_enc}"></ion-icon>
              <p id="messsage_timing" class="messsage_timing">${doc.data().when.split("at")[0].trim() == currentDate ?  "Today at"+doc.data().when.split("at")[1]: doc.data().when}</p> 
              <div class="heading"><p class="heading_notes" id="heading_${doc.data().message_id_enc}" data-value="${doc.data().message_id_enc}" name = "p_heading">${doc.data().message_id_enc}</p> <ion-icon name="copy" onclick = "copy_tag(this)" class="copy_tag" id="heading_ico${doc.data().message_id_enc}" data-id="${doc.data().message_id_enc}"></ion-icon> </div>
              <div class="content_info" id="${doc.data().message_id_enc}"><p class="content_notes" id="content_notes${doc.data().message_id_enc}">${doc.data().message}</p></div>
              </div>`
              
              document.getElementById(message_id).style.transform = "scale(0)";
              setTimeout(() => {
                document.getElementById(message_id).style.transform = "scale(1.5)";
              }, 200);
              setTimeout(() => {
                document.getElementById(message_id).style.transform = "scale(1)";
              }, 300);
             }
             document.getElementById("content").innerHTML += content_zone; 
             setTimeout(() => {
              document.getElementById("message_send_loader").style.display = "none";
             }, 800);
        });
        // console.log(contentHolderDOM.lastChild); 
        // ref = db.collection("Items").where("type", "==", "message").get();
        // console.log( ref.docs[ref.docs.length - 1])
    });
    
  }
   
  const DocumentGet_ref = async() =>
  {
    const ref = db.collection("Items").where("type", "==", "message").orderBy("timestamp").startAfter(latestDocument || 0).limit(maxDataFetch);
    const data = await ref.get();
    latestDocument = data.docs[data.docs.length - 1];
    if(data.empty)
    {
      latestDocument = null;

    }
    db.collection("Items").where("type", "==", "message").orderBy("timestamp").startAfter(latestDocument || 0).limit(maxDataFetch)
    .onSnapshot((querySnapshot) => {
      // document.getElementById("content").innerHTML = "";
        querySnapshot.forEach((doc) => {
            document.getElementById("message_send_loader").style.display = "block";
             message_id = doc.data().message_id;  //contains the user IP address + timestamp
             message_id = message_id.split("-")[0]; //contains the user IP address
             if(message_id == localStorage.getItem("uid")) //checks if the IP address matches with the user i.e self view
             {
              content_zone = ` <div class="content_holding" id="${doc.data().message_id}" name="${doc.data().message_id_enc}">
              <ion-icon name="caret-down"  class="expand_content" id="expand_content" onclick = "content_expand(this)" data-id="${doc.data().message_id_enc}"></ion-icon>
              <ion-icon name="pencil" id="edit_message${doc.data().message_id}" data-id= "${doc.data().message_id}" onclick = "edit_content(this)" class="edit_message"></ion-icon>
              <ion-icon name="trash" id="delete_message${doc.data().message_id}" data-id= "${doc.data().message_id}" onclick = "delete_content(this)" class="delete_message"></ion-icon>
              <p id="messsage_timing" class="messsage_timing">${doc.data().when.split("at")[0].trim() == currentDate ?  "Today at"+doc.data().when.split("at")[1]: doc.data().when}</p> 
              <div class="heading"><p class="heading_notes" id="heading_${doc.data().message_id_enc}" data-value="${doc.data().message_id_enc}">${doc.data().message_id_enc}</p> <ion-icon name="copy" onclick = "copy_tag(this)" class="copy_tag" id="heading_ico${doc.data().message_id_enc}" data-id="${doc.data().message_id_enc}"></ion-icon> </div>
              <div class="content_info" id="${doc.data().message_id_enc}"><p class="content_notes" id="content_notes${doc.data().message_id_enc}">${doc.data().message}</p></div>
              </div>`
              
             }  
             else
             {
              content_zone = ` <div class="content_holding" id="${doc.data().message_id}" name="${doc.data().message_id_enc}">
              <ion-icon name="caret-down" class="expand_content" id="expand_content" onclick = "content_expand(this)" data-id="${doc.data().message_id_enc}"></ion-icon>
              <p id="messsage_timing" class="messsage_timing">${doc.data().when.split("at")[0].trim() == currentDate ?  "Today at"+doc.data().when.split("at")[1]: doc.data().when}</p> 
              <div class="heading"><p class="heading_notes" id="heading_${doc.data().message_id_enc}" data-value="${doc.data().message_id_enc}">${doc.data().message_id_enc}</p> <ion-icon name="copy" onclick = "copy_tag(this)" class="copy_tag" id="heading_ico${doc.data().message_id_enc}" data-id="${doc.data().message_id_enc}"></ion-icon> </div>
              <div class="content_info" id="${doc.data().message_id_enc}"><p class="content_notes" id="content_notes${doc.data().message_id_enc}">${doc.data().message}</p></div>
              </div>`
              
              document.getElementById(message_id).style.transform = "scale(0)";
              setTimeout(() => {
                document.getElementById(message_id).style.transform = "scale(1.5)";
              }, 200);
              setTimeout(() => {
                document.getElementById(message_id).style.transform = "scale(1)";
              }, 300);
             }
             document.getElementById("content").innerHTML += content_zone; 
             setTimeout(() => {
              document.getElementById("message_send_loader").style.display = "none";
             }, 800);
            
        });
        // console.log(contentHolderDOM.lastChild); 

    });
  }
 
  contentHolderDOM.addEventListener("scroll", (e) => {
    contentHolderDOM.scrollTop + contentHolderDOM.clientHeight >= contentHolderDOM.scrollHeight ? 
    DocumentGet_ref() : null;
   
  })
// ====================================================================================== 


         // loader_ripple
         setInterval(() => {
        
         if(document.getElementById("content").childElementCount > 0)
         {
           document.getElementById("loader_ripple").style.display = "none";
          document.getElementById("background_animation").style.display = "block";
         }
         else
         {
           document.getElementById("loader_ripple").style.display = "block";
           document.getElementById("background_animation").style.display = "none";
          
           DocumentGet();
           setTimeout(() => {
            contentHolderDOM.childElementCount > 0 ? null : location.reload();
           }, 5000);
          
         }
       }, 100);
      
 })

//CHECKING THE SCROLL OF THE CONTENT ELEMENT TO CHECK IF IT HAS REACHED THE END OF IT

//FUNCTION TO DELETE SELF CONTENT
function delete_content(self)
{
  content_delete_id = self.getAttribute("data-id");
  document.getElementById(content_delete_id).style.transform = "translateX(1960px)";
  setTimeout(() => {
    db.collection("Items").doc(content_delete_id).delete().then(() => {
    
      document.getElementById(content_delete_id).remove();
      location.reload();
      // contentHolderDOM.innerHTML = "";
    }).catch((error) => {
      console.error("Error removing document: ", error);
      location.reload();
    });
  }, 600);
  
}
//FUNCTION TO EDIT SELF CONTENT
function edit_content(self)
{

  document.getElementById("message").focus(); //FOCUS ON ELEMENT
  for(let i = 0; i < document.getElementsByClassName("edit_message").length; i++)
  {
    let id = (document.getElementsByClassName("edit_message")[i].id);
    
  document.getElementById(id).classList.contains("active") ? document.getElementById(id).classList.toggle("active") : null;
    
      
  
  }

  
  let content_expand_id = self.getAttribute("data-id"); //GET THE CURRENT TARGET ELEMENT

  document.getElementById("send").setAttribute("data-id", content_expand_id);
  document.getElementById("cancel_edit").setAttribute("data-id", content_expand_id);

  document.getElementById("edit_message"+content_expand_id).classList.toggle("active");
  var docRef = db.collection("Items").doc(content_expand_id);
    document.getElementById("message").focus();
    document.getElementById("message").value =  self.getAttribute("data-value");
    let edit_message_detect = setInterval(() => {
      document.getElementById("message").value != doc.data().message ? document.getElementById("message_send_loader").style.display = "block" : (setTimeout(() => {
        document.getElementById("message_send_loader").style.display = "none";
       }, 800) , (clearInterval(edit_message_detect)))
    }, 2);

  
  
}
//FUNCTION TO EXTEND CONTENT
function content_expand(self)
{
  content_id = self.getAttribute("data-id");
  
  self.classList.toggle("active");
  document.getElementsByName(content_id)[0].classList.toggle("active"); // targets whole block
  document.getElementById("content_notes"+content_id).classList.toggle("active");  //targets the one which holds the content in the DOM
  document.getElementById(content_id).classList.toggle("active"); //targets the whole content holder (has the  P tag inside it)

  if(document.getElementById(content_id).classList.contains("active") == true)
  {
    var scrollDiv = document.getElementsByName(content_id)[0].offsetTop;
    contentHolderDOM.scrollTo({ top: scrollDiv, behavior: 'smooth'}); 
    // GET THE CONTENT HEIGHT
  }


}
//FUNCTION TO COPY TAG
function copy_tag(self)
{
  tag_name = self.getAttribute("data-id");
  navigator.clipboard.writeText(tag_name);
  // console.log(document.getElementById("heading_"+tag_name).dataset.value)
  document.getElementById("heading_ico"+tag_name).style.transform = "translateY(50px)"
  setTimeout(() => {
    document.getElementById("heading_ico"+tag_name).style.transform = "translateY(0px)"
  }, 200);
  document.getElementById("heading_"+tag_name).innerText = "Copied";
  setTimeout(() => {
    document.getElementById("heading_"+tag_name).innerText = document.getElementById("heading_"+tag_name).dataset.value;
  }, 800);
}


document.getElementById("search_items_ico").addEventListener("click", () => {
  document.getElementById("search").classList.toggle("active");
})

// CHECKS IF THE SEARCHING ALGORITHM IS BEING TRIGGERED AND FEEDBACK METHOD (HIGHLIGHTING)
// SOME KEYBINDS
    document.addEventListener("keydown" , (e) => {
      (e.code == "Escape") ? (document.getElementById("search").classList.toggle("active"),document.getElementById("search").focus()) : null;
     ( e.ctrlKey && e.key === 'p') ? (filter_self_all(), e.preventDefault()) : null;
     (e.ctrlKey && e.key === 's')  ?  (expand_message_func(),e.preventDefault()) : null
    })
    setInterval(() => {
      document.getElementById("search").classList.contains("active") ? document.getElementById("search_items_ico").style.color = "#00ffd56c" : document.getElementById("search_items_ico").style.color = "#fff";
    }, 100);
    document.getElementById("search").addEventListener("input" , () => {
      filter_on_search();
    })
      

// FILTER ALGORITHM TO MOVE FROM SELF VIEW TO ALL VICE-VERSA
function filter_self_all()
{
  if(document.getElementById("filter_self").classList.contains("active") == false) //general view is currently active
  {
    document.getElementById("filter_self").classList.add("active");
    document.querySelectorAll(".content_holding").forEach(elm => {
      if(elm.id.split("-")[0] == localStorage.getItem("uid"))
      {
        elm.style.display = "block";
      }
      else
      {
        elm.style.display = "none";
      }
      
      
    })
  }
  else //already in self view
  {
    document.getElementById("filter_self").classList.remove("active")
    document.querySelectorAll(".content_holding").forEach(elm => {
      elm.style.display = "block";
    })
  }
}


document.getElementById("filter_self").addEventListener("click" ,() => { 
  filter_self_all();
})


// EXTRA
function resize(data_length)
{
 if(Math.ceil(data_length / 71 == 1))
 {
    textarea.style.height = "55px";
    textarea.style.top = "0px";
 }
 else if(Math.ceil(data_length / 71 == 2))
 {
    textarea.style.height = "64px";
    textarea.style.top = "-8px";
 }
 else if(Math.ceil(data_length / 71 == 3))
 {
    textarea.style.height = "94px";
    textarea.style.top = "-38px";
 }
 else if(Math.ceil(data_length / 71 == 4))
 {
    textarea.style.height = "124px";
    textarea.style.top = "-70px";
 }
 else if(Math.ceil(data_length / 71 == 5))
 {
    textarea.style.height = "154px";
    textarea.style.top = "-100px";
 }
 else if(Math.ceil(data_length / 71 > 5))
 {
    textarea.style.height = "154px";
    textarea.style.top = "-100px";
 }
 

}


// ONLINE / OFFLINE DETECTION SYSTEM
window.onload = ()=>{
  function ajax(){
      let xhr = new XMLHttpRequest(); //creating new XML object
      xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true); //sending get request on this URL
      xhr.onload = ()=>{ //once ajax loaded
          //if ajax status is equal to 200 or less than 300 that mean user is getting data from that provided url
          //or his/her response status is 200 that means he/she is online
          if(xhr.status == 200 && xhr.status < 300){
              
            document.getElementById("fade_ico_on").style.color = "#00ff55";


            // THIS PROCESS SCANS THROUGH ALL THE ELEMENTS NAMED BY CLASS .edit_message & .delete_message
            // IT THEN SELECTS EACH OF THEM ND FINDS ALL THE ELEMENTS INSIDE THE DOM WITH THE CLASS NAME OF THE SAME
            // IT ITERATES THROUGH ALL THE CLASS NAMES OF EACH OF THEM AND GETS ELEMENT --> ID --> SELECTS THE ELEMENTS --> SETS THE POINTEREVENTS TO NONE!

            [".edit_message", ".delete_message"].forEach(elm_per => {
              document.querySelectorAll(elm_per).forEach(elm => {
                document.getElementById(elm.id).style.pointerEvents = "all";
                document.getElementById(elm.id).classList.contains("active") ? document.getElementById(elm.id).style.color = "#00ff37" : document.getElementById(elm.id).style.color = "#fff";
                document.getElementById("send").classList.remove("deactivated");
              });
              document.getElementById("favicon").setAttribute("href", "./IMG/SecRet_logo.png")
              document.title = "1/Cos-Rects!";
            })
            
          }else{
              offline(); //calling offline function if ajax status is not equal to 200 or not less that 300
          }
      }
      xhr.onerror = ()=>{
          offline(); ////calling offline function if the passed url is not correct or returning 404 or other error
         
      } 
      xhr.send(); //sending get request to the passed url
  }
  function offline(){ //function for offline
    document.getElementById("fade_ico_on").style.color = "#ff0022";
    document.getElementById("favicon").setAttribute("href", "./IMG/SecRet_logo_off.png");
    document.title = "404 - No Internet";
    [".edit_message", ".delete_message"].forEach(elm_per => {
      document.querySelectorAll(elm_per).forEach(elm => {
        document.getElementById(elm.id).style.pointerEvents = "none";
        document.getElementById(elm.id).classList.contains("active") ? null : document.getElementById(elm.id).style.color = "#fff";
        document.getElementById("send").classList.add("deactivated");
      });
    })
  }
  setInterval(()=>{ //this setInterval function call ajax frequently after 100ms
      ajax();
  }, 100);
}


function filter_on_search()
{
  
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    ul = document.getElementById("content");
    li = ul.getElementsByClassName('content_holding');

    
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      // console.log()
      
      txtValue =  li[i].getAttribute("name")
      console.log(txtValue);
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        document.getElementById(li[i].getAttribute("id")).style.display = "";
      } else {
        document.getElementById(li[i].getAttribute("id")).style.display = "none";
      }
     }
}


function randomValues() {
  anime({
    targets: '.square, .circle, .triangle',
    translateX: function() {
      return anime.random(-500, 500);
    },
		translateY: function() {
      return anime.random(-300, 300);
    },
		rotate: function() {
			return anime.random(0, 360);
		},
		scale: function() {
			return anime.random(.2, 2);
		},
    duration: 1000,
		easing: 'easeInOutQuad',
    complete: randomValues,
	});
}
randomValues();

// DRAFT SYSTEM [CLOSED]
//SEND ON ENTER KEY [CLOSED]
// HIGHLIGHT THE ICON WHEN SELF POST GETTING VIEWED  [CLOSED]
// SEARCHING ALGORITHM [CLOSED]
// OFFLINE/ONLINE NOTIF [CLOSED]
// INSTRUCTION PAGE 
// MESSAGE LOADING ALGORITHM 60 AT ONCE THEN SHUFFLE [CLOSED]
//LOADING ANIMATION [CLOSED]
//disable CTRL + S nd assign a new function [CLOSED] [PROBLEM] [CLOSED]
//check if both the self view nd the other view has common algorithm [CLOSED]

// SOME KEYBINDS [PROBLEM] [CLOSED]
// SCROLL INTO VIEW [PROGRESS] [CLOSED]



//FEEDBACK FROM SERVER DURING MESSAGE SEND / EDIT / LOAD [PROGRESS] [CLOSED]

// L131211247IHE

