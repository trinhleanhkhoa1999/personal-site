let dragValue;
function move() {
  let element = document.querySelector(".box");
  element.style.position = "absolute";
  element.onmousedown = function (e) {
    dragValue = element;
    dragValue.startX = e.pageX - dragValue.offsetLeft;
    dragValue.startY = e.pageY - dragValue.offsetTop;
  };
}
document.onmouseup = function () {
  dragValue = null;
};
document.onmousemove = function (e) {
  if (!dragValue) {
    return;
  }
  let x = e.pageX - dragValue.startX;
  let y = e.pageY - dragValue.startY;
  let wrapper = document.getElementById("wrapper");
  let wrapperRect = wrapper.getBoundingClientRect();
  if (x < wrapperRect.left) {
    x = wrapperRect.left;
  } else if (x + dragValue.offsetWidth > wrapperRect.right) {
    x = wrapperRect.right - dragValue.offsetWidth;
  }
  if (y < wrapperRect.top) {
    y = wrapperRect.top;
  } else if (y + dragValue.offsetHeight > wrapperRect.bottom) {
    y = wrapperRect.bottom - dragValue.offsetHeight;
  }
  dragValue.style.left = x + "px";
  dragValue.style.top = y + "px";
};

// let draggableElem = document.getElementById("draggable-elem");
// let initialX = 0;
// let initialY = 0;
// let moveElement = false;

// //Events Object
// let events = {
//   mouse: {
//     down: "mousedown",
//     move: "mousemove",
//     up: "mouseup",
//   },
//   touch: {
//     down: "touchstart",
//     move: "touchmove",
//     up: "touchend",
//   },
// };

// let deviceType = "";

// //Detech touch device
// const isTouchDevice = () => {
//   try {
//     //We try to create TouchEvent (it would fail for desktops and throw error)
//     document.createEvent("TouchEvent");
//     deviceType = "touch";
//     return true;
//   } catch (e) {
//     deviceType = "mouse";
//     return false;
//   }
// };

// isTouchDevice();

// //Start (mouse down / touch start)
// draggableElem.addEventListener(events[deviceType].down, (e) => {
//   e.preventDefault();
//   //initial x and y points
//   initialX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
//   initialY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;

//   //Start movement
//   moveElement = true;
// });

// //Move
// draggableElem.addEventListener(events[deviceType].move, (e) => {
//   //if movement == true then set top and left to new X andY while removing any offset
//   if (moveElement) {
//     e.preventDefault();
//     let newX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
//     let newY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
//     draggableElem.style.top =
//       draggableElem.offsetTop - (initialY - newY) + "px";
//     draggableElem.style.left =
//       draggableElem.offsetLeft - (initialX - newX) + "px";
//     initialX = newX;
//     initialY = newY;
//   }
// });

// //mouse up / touch end
// draggableElem.addEventListener(
//   events[deviceType].up,
//   (stopMovement = (e) => {
//     moveElement = false;
//   })
// );

// draggableElem.addEventListener("mouseleave", stopMovement);
// draggableElem.addEventListener(events[deviceType].up, (e) => {
//   moveElement = false;
// });
