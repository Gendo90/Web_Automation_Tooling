var HTMLmobile = '<li class="flex-item"><span class="orange-text">mobile</span><span class="white-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item"><span class="orange-text">email</span><span class="white-text">%data%</span></li>';
var HTMLtwitter = '<li class="flex-item"><span class="orange-text">twitter</span><span class="white-text">%data%</span></li>';
var HTMLgithub = '<li class="flex-item"><span class="orange-text">github</span><span class="white-text">%data%</span></li>';
//var HTMLblog = '<li class="flex-item"><span class="orange-text">blog</span><span class="white-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item"><span class="orange-text">location</span><span class="white-text">%data%</span></li>';

model ={
  //work sub-object for the model, contains personal info
  bio: {
    name: "Patrick Gendotti",
    role: "Engineer",
    contacts: {
      mobile: "(650) 455-0086",
      email: "patrick.gendotti@gmail.com",
      github: "Gendo90",
      twitter: "",
      location: "SF Bay Area"
    },

  welcomeMessage: "It's nice of you to stop by!",
  skills: ["JavaScript", "JQuery", "MatLab", "Python", "CSS", "HTML"],
  biopic: "images/Biopic.jpg"

  }
}

octopus = {

  bio: model.bio,

  setupFooter: function () {
  //setup topContacts HTML strings
  HTMLmobile = HTMLmobile.replace("%data%", octopus.bio.contacts.mobile);
  HTMLemail = HTMLemail.replace("%data%", octopus.bio.contacts.email);
  HTMLtwitter = (this.bio.contacts.twitter !== "") ? HTMLtwitter.replace("%data%", octopus.bio.contacts.twitter):null;
  HTMLgithub = HTMLgithub.replace("%data%", octopus.bio.contacts.github);
  HTMLlocation = HTMLlocation.replace("%data%", octopus.bio.contacts.location);
}
}

view = {
renderFooter: function(){
  //adds contacts to the footer
  $("#footerContacts").append(HTMLmobile);
  $("#footerContacts").append(HTMLemail);
  $("#footerContacts").append(HTMLtwitter);
  $("#footerContacts").append(HTMLgithub);
  $("#footerContacts").append(HTMLlocation);
}
}


octopus.setupFooter();


view.renderFooter();
