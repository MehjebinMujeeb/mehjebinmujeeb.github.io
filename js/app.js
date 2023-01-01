/* ------------- INDEX PAGE JS ------------ */

const inViewport = (entries, observer) => {
    entries.forEach(entry => {
      entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
    });
  };
  
  const Obs = new IntersectionObserver(inViewport);
  const obsOptions = {}; //See: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
  
  // Attach observer to every [data-inviewport] element:
  const ELs_inViewport = document.querySelectorAll('[data-inviewport]');
  ELs_inViewport.forEach(EL => {
    Obs.observe(EL, obsOptions);
  });
  
  
  // Logic for creating the spotlight
  function createSpotlight()
  {
      const spotlightDiv = document.getElementById("spotlight").addEventListener("mousemove", mousemoveFunction);
  }
  function mousemoveFunction(event) {
      const shapes = document.getElementsByClassName("shape");
      const cursor = document.getElementsByClassName("cursor")[0]; // only need the first cursor
  
      var x = event.clientX;
      var y = event.clientY;
  
      //console.log("translate3d(" + x + "," + y + ", 0)");
  
      cursor.style.transform = "translate3d(" + x + "px," + y + "px, 0)";
  
      for(var shape of shapes){
          shape.style.transform = "translate3d(" + x + "px ," + y + "px , 0)";
      }
  }
  
  
  
  var isMenuBarShown = false;
  function toggleNavBarLinks(event)
  {
     console.log("helloo");
     const menuBar = document.getElementById("menu-bar");
  
     if(isMenuBarShown){
      menuBar.style.setProperty("display", "none", "important");
     }
     else {
      menuBar.style.setProperty("display", "block", "important");
     }
  
     isMenuBarShown = !isMenuBarShown;
      
  
  }
  

function homePageInit(){
  const navToggleBtn = document.getElementById("toggle-nav-bar-links");
  navToggleBtn.addEventListener("click", toggleNavBarLinks);
}
  
  // const navLinks = document.getElementsByClassName("nav-link");
  // for(var navLink of navLinks)
  // {
  //     navLink.addEventListener("click", toggleNavBarLinks);
  // }
  
  /* ------------- INDEX PAGE JS ENDS ------------ */



    /* ------------- FOCUS PAGE JS ------------ */

    var taskArray = [];

    function swapItemState(id)
    {
        
        var obj = taskArray[id];
  
        if(obj.state === 'item-inprogress')
        {
            obj.state = 'item-done';
        }
        else
        {
            obj.state = 'item-inprogress';
        }
        
  
        fillList();
    }
  
    function fillList() {
        var taskList = document.getElementsByClassName("todo-list")[0];
        taskList.innerHTML = "";
  
        for (var taskObj of taskArray)
        {
  
            var taskItem = '<div onclick="swapItemState(' + taskObj.id + ')" id="' +
                 taskObj.id + '" class="todo-item ' + taskObj.state  +  '" >' +
                 '<img src="/images/accept.png" alt="A vector illustration of a checkbox."></img><p>' +
                 taskObj.title +
                 '</p></div>';
  
            taskList.innerHTML = taskList.innerHTML + taskItem;
        }
  
        if(taskArray.length == 0)
        {
            taskList.innerHTML = "<div class=\"no-task-image\"></div>"
        }
    }
  
  
    function addTask() {
        var taskTextBox = document.getElementById("task-text");
        var text = taskTextBox.value;
  
        // Prevent adding it the text box is empty;
        text = text.trim();
  
        if(text.length <= 0)
        {
            return;
        }
  
        var taskObj = {
            id: taskArray.length,
            title: text,
            state: 'item-inprogress'
        }
  
        taskArray.push(taskObj)
  
        // console.table(taskArray);
        taskTextBox.value = "";
  
        fillList();
        
    }
  
    function clearTask() {
        taskArray = [];
        fillList();
    }
  
  
  
    var selectedDuration = 1200;
    var totalSeconds = 1200; // 20 mins in Seconds
    var timer;
    
    isPaused = true;
    isFirstTime = true;
  
    function playAndPause()
    {
        var playButton = document.getElementById("play-button");
        isPaused = !isPaused;
  
        console.log(isPaused);
        console.log(isFirstTime);
  
        if(isPaused)
        {
            playButton.classList.remove("pause-btn");
            playButton.classList.add("play-btn");
        }
        else
        {
            playButton.classList.remove("play-btn");
            playButton.classList.add("pause-btn");
        }
  
        if(isFirstTime)
        {
            isFirstTime = false;
            timerFunc();
        }
    }
  
    function timerFunc() {
        var clock = document.getElementById("clock");
        timer = setInterval(function(){
            var mins = Math.floor(totalSeconds/60);
            var secs = totalSeconds % 60;
            
            if(mins < 10)
            {
                mins = "0" + mins
            }
  
            if(secs < 10)
            {
                secs = "0" + secs
            }
  
            var clockText = mins + ":" + secs;
  
            clock.innerHTML = clockText;
  
            if(isPaused)
            {
                return;
            }
  
            totalSeconds --;
  
            if(totalSeconds <= 0)
            {
                resetTimer();
            }
            
        }, 1000);
  
    }
  
    function selectTimerDuration(duration) {
        var clock = document.getElementById("clock");
        resetTimer();
        selectedDuration = duration;
        totalSeconds = duration;
        var mins = Math.floor(totalSeconds/60);
        var secs = totalSeconds % 60;
        
        if(mins < 10)
        {
            mins = "0" + mins
        }
  
        if(secs < 10)
        {
            secs = "0" + secs
        }
        var clockText = mins + ":" + secs;
        clock.innerHTML = clockText;
    }
  
    function resetTimer(){
        var clock = document.getElementById("clock");
        if(timer === undefined || timer === null)
        {
            return;
        }
  
        clearTimeout(timer);
        timer = null;
  
        totalSeconds = selectedDuration;
        var mins = Math.floor(totalSeconds/60);
        var secs = totalSeconds % 60;
        
        if(mins < 10)
        {
            mins = "0" + mins
        }
  
        if(secs < 10)
        {
            secs = "0" + secs
        }
        var clockText = mins + ":" + secs;
        clock.innerHTML = clockText;
  
       isFirstTime = true;
       isPaused = true;
       var playButton = document.getElementById("play-button");
       playButton.classList.remove("pause-btn");
       playButton.classList.add("play-btn");
    }
  
    function focusPageInit()
    {
          //  Adding event listners only after the page is loaded
          document.getElementById("addTaskBtn").addEventListener('click', addTask);
          document.getElementById("clearTaskBtn").addEventListener('click', clearTask);
    }
  
  /* ------------- FOCUS PAGE JS END ------------ */
  
  
