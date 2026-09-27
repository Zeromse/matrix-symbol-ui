const works = [
  {
    titleA: "Warp",
    titleB: "Field",
    description: "将平面秩序折叠成一条通往视觉核心的路径。",
    image: "../微信图片_20260926195810_419_2.jpg",
  },
  {
    titleA: "Split",
    titleB: "Space",
    description: "镜像、切割与悬浮结构重新划分观看的边界。",
    image: "../微信图片_20260926195809_418_2.jpg",
  },
  {
    titleA: "Emit",
    titleB: "Core",
    description: "信号从中心释放，穿过几何阵列形成可见频谱。",
    image: "../微信图片_20260926195807_417_2.jpg",
  },
  {
    titleA: "Gravity",
    titleB: "Gate",
    description: "透视矩阵把视线牵引至一个持续收缩的符号入口。",
    image: "../微信图片_20260926195803_416_2.jpg",
  },
];

const frame = document.querySelector("#artFrame");
const image = document.querySelector("#heroImage");
const titleA = document.querySelector("#titleA");
const titleB = document.querySelector("#titleB");
const description = document.querySelector("#description");
const currentIndex = document.querySelector("#currentIndex");
const progressBar = document.querySelector("#progressBar");
const plates = [...document.querySelectorAll(".plate")];
const autoButton = document.querySelector("#soundToggle");

let activeIndex = 0;
let autoplay = true;
let timer;

function showWork(nextIndex, scrollToViewer = false) {
  activeIndex = (nextIndex + works.length) % works.length;
  const work = works[activeIndex];

  frame.classList.add("changing");
  window.setTimeout(() => {
    image.src = work.image;
    image.alt = `${work.titleA} ${work.titleB} 视觉实验`;
    titleA.textContent = work.titleA;
    titleB.textContent = work.titleB;
    description.textContent = work.description;
    currentIndex.textContent = String(activeIndex + 1).padStart(2, "0");
    progressBar.style.width = `${((activeIndex + 1) / works.length) * 100}%`;
    plates.forEach((plate, index) => plate.classList.toggle("active", index === activeIndex));
    frame.classList.remove("changing");
  }, 260);

  if (scrollToViewer) {
    document.querySelector("#top").scrollIntoView({ behavior: "smooth" });
  }
  restartTimer();
}

function restartTimer() {
  window.clearInterval(timer);
  if (autoplay) timer = window.setInterval(() => showWork(activeIndex + 1), 6500);
}

document.querySelector("#prevButton").addEventListener("click", () => showWork(activeIndex - 1));
document.querySelector("#nextButton").addEventListener("click", () => showWork(activeIndex + 1));

plates.forEach((plate) => {
  plate.addEventListener("click", () => showWork(Number(plate.dataset.index), true));
});

autoButton.addEventListener("click", () => {
  autoplay = !autoplay;
  autoButton.querySelector("span").textContent = autoplay ? "Ⅱ" : "▶";
  autoButton.setAttribute("aria-label", autoplay ? "暂停自动播放" : "开始自动播放");
  restartTimer();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showWork(activeIndex - 1);
  if (event.key === "ArrowRight") showWork(activeIndex + 1);
});

const viewer = document.querySelector(".viewer");
viewer.addEventListener("pointermove", (event) => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;
  frame.style.transform = `perspective(1200px) rotateX(${y * -3}deg) rotateY(${x * 4}deg) translate3d(${x * 8}px, ${y * 8}px, 0)`;
});
viewer.addEventListener("pointerleave", () => { frame.style.transform = ""; });

restartTimer();
