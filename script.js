/* =========================================================
   FUTURE READY AI — SITE SCRIPT
   Vanilla JS only. No frameworks, no build step.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initAccordions();
  initResourceFilters();
  initDemoForms();
  initHeroVideo();
  initWelcomeVideo();
  initAboutVideo();
  initEducatorVideo();
  initCurriculumVideo();
  initGradeBandVideos();
  setCopyrightYear();
});

/* -----------------------------------------------------------
   Mobile navigation toggle
   ----------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const links = document.querySelector("[data-nav-links]");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    links.setAttribute("data-open", String(!isOpen));
    document.body.style.overflow = !isOpen ? "hidden" : "";
  });

  // Close menu when a link is chosen (mobile)
  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      links.setAttribute("data-open", "false");
      document.body.style.overflow = "";
    });
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      toggle.setAttribute("aria-expanded", "false");
      links.setAttribute("data-open", "false");
      document.body.style.overflow = "";
      toggle.focus();
    }
  });
}

/* -----------------------------------------------------------
   Accessible accordion (FAQ sections, etc.)
   ----------------------------------------------------------- */
function initAccordions() {
  const triggers = document.querySelectorAll(".accordion-trigger");

  triggers.forEach((trigger) => {
    const panel = document.getElementById(trigger.getAttribute("aria-controls"));
    if (!panel) return;

    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      trigger.setAttribute("aria-expanded", String(!isOpen));
      panel.hidden = false;

      if (!isOpen) {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } else {
        panel.style.maxHeight = "0px";
      }
    });
  });
}

/* -----------------------------------------------------------
   Resource category filtering (Resources page)
   ----------------------------------------------------------- */
function initResourceFilters() {
  const chips = document.querySelectorAll("[data-filter-chip]");
  const cards = document.querySelectorAll("[data-resource-card]");
  const emptyState = document.querySelector("[data-empty-state]");
  if (!chips.length || !cards.length) return;

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.setAttribute("aria-pressed", "false"));
      chip.setAttribute("aria-pressed", "true");

      const filter = chip.getAttribute("data-filter-chip");
      let visibleCount = 0;

      cards.forEach((card) => {
        const categories = card.getAttribute("data-categories") || "";
        const matches = filter === "all" || categories.split(/\s+/).includes(filter);
        card.hidden = !matches;
        if (matches) visibleCount++;
      });

      if (emptyState) {
        emptyState.hidden = visibleCount !== 0;
      }
    });
  });
}

/* -----------------------------------------------------------
   Demonstration form handling (no backend connected yet)
   ----------------------------------------------------------- */
function initDemoForms() {
  const forms = document.querySelectorAll("[data-demo-form]");

  forms.forEach((form) => {
    const message = form.querySelector(".form-message");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (message) {
        message.setAttribute("data-visible", "true");
        message.setAttribute("tabindex", "-1");
        message.focus();
      }

      // [CONNECT FORM SERVICE]
      // This form currently has no backend connected. When a form
      // service (e.g. Formspree, Netlify Forms, a custom API) is
      // ready, replace this handler with a real submission and
      // remove the demonstration message below.
      console.info("Future Ready AI: form submitted in demo mode. Connect a form service to enable real submissions.");
    });
  });
}

/* -----------------------------------------------------------
   Grade-band pathway videos AND the featured drone/workforce
   videos (all native <video controls>) — pause any other video
   in this combined group when one starts playing.
   ----------------------------------------------------------- */
function initGradeBandVideos() {
  const gradeVideos = document.querySelectorAll(
    ".grade-video-card video, .drone-lab-card__media video, .career-pathways-showcase__media video"
  );

  gradeVideos.forEach((currentVideo) => {
    currentVideo.addEventListener("play", () => {
      gradeVideos.forEach((otherVideo) => {
        if (otherVideo !== currentVideo) {
          otherVideo.pause();
        }
      });
    });
  });
}

/* -----------------------------------------------------------
   Curriculum Overview video — play/pause/sound.
   Independent from the homepage, About, and For Educators videos.
   ----------------------------------------------------------- */
function initCurriculumVideo() {
  const curriculumVideo = document.querySelector(
    "[data-curriculum-video]"
  );
  const curriculumPlay = document.querySelector(
    "[data-curriculum-play]"
  );
  const curriculumPause = document.querySelector(
    "[data-curriculum-pause]"
  );
  const curriculumSound = document.querySelector(
    "[data-curriculum-sound]"
  );

  if (
    !curriculumVideo ||
    !curriculumPlay ||
    !curriculumPause ||
    !curriculumSound
  ) {
    return;
  }

  curriculumVideo.loop = false;

  curriculumPlay.addEventListener("click", async () => {
    try {
      await curriculumVideo.play();
      curriculumPlay.hidden = true;
      curriculumPause.hidden = false;
    } catch (error) {
      console.error(
        "The Curriculum Overview video could not be played.",
        error
      );
    }
  });

  curriculumPause.addEventListener("click", () => {
    curriculumVideo.pause();
    curriculumPlay.hidden = false;
    curriculumPause.hidden = true;
  });

  curriculumSound.addEventListener("click", () => {
    curriculumVideo.muted = !curriculumVideo.muted;

    curriculumSound.textContent = curriculumVideo.muted
      ? "Unmute"
      : "Mute";

    curriculumSound.setAttribute(
      "aria-label",
      curriculumVideo.muted
        ? "Unmute the Curriculum Overview video"
        : "Mute the Curriculum Overview video"
    );
  });

  curriculumVideo.addEventListener("ended", () => {
    curriculumPlay.hidden = false;
    curriculumPause.hidden = true;
  });
}

/* -----------------------------------------------------------
   For Educators page video — play/pause/sound.
   Separate selectors from the hero, homepage-welcome, and About
   videos, so this one operates fully independently.
   ----------------------------------------------------------- */
function initEducatorVideo() {
  const educatorVideo = document.querySelector("[data-educator-video]");
  const educatorPlay = document.querySelector("[data-educator-play]");
  const educatorPause = document.querySelector("[data-educator-pause]");
  const educatorSound = document.querySelector("[data-educator-sound]");

  if (!educatorVideo || !educatorPlay || !educatorPause || !educatorSound) {
    return;
  }

  educatorVideo.loop = false;

  educatorPlay.addEventListener("click", async () => {
    try {
      await educatorVideo.play();
      educatorPlay.hidden = true;
      educatorPause.hidden = false;
    } catch (error) {
      console.error("The For Educators video could not be played.", error);
    }
  });

  educatorPause.addEventListener("click", () => {
    educatorVideo.pause();
    educatorPlay.hidden = false;
    educatorPause.hidden = true;
  });

  educatorSound.addEventListener("click", () => {
    educatorVideo.muted = !educatorVideo.muted;

    educatorSound.textContent = educatorVideo.muted
      ? "Unmute"
      : "Mute";

    educatorSound.setAttribute(
      "aria-label",
      educatorVideo.muted
        ? "Unmute the For Educators video"
        : "Mute the For Educators video"
    );
  });

  educatorVideo.addEventListener("ended", () => {
    educatorPlay.hidden = false;
    educatorPause.hidden = true;
  });
}

/* -----------------------------------------------------------
   About page video — play/pause/sound.
   Separate selectors from both the hero video and the homepage
   welcome video, so none of the three can control one another.
   ----------------------------------------------------------- */
function initAboutVideo() {
  const aboutVideo = document.querySelector("[data-about-video]");
  const aboutPlay = document.querySelector("[data-about-play]");
  const aboutPause = document.querySelector("[data-about-pause]");
  const aboutSound = document.querySelector("[data-about-sound]");

  if (aboutVideo && aboutPlay && aboutPause && aboutSound) {
    aboutVideo.loop = false;

    aboutPlay.addEventListener("click", async () => {
      try {
        await aboutVideo.play();
        aboutPlay.hidden = true;
        aboutPause.hidden = false;
      } catch (error) {
        console.error("The About video could not be played.", error);
      }
    });

    aboutPause.addEventListener("click", () => {
      aboutVideo.pause();
      aboutPlay.hidden = false;
      aboutPause.hidden = true;
    });

    aboutSound.addEventListener("click", () => {
      aboutVideo.muted = !aboutVideo.muted;
      aboutSound.textContent = aboutVideo.muted ? "Unmute" : "Mute";
      aboutSound.setAttribute(
        "aria-label",
        aboutVideo.muted ? "Unmute the About video" : "Mute the About video"
      );
    });

    aboutVideo.addEventListener("ended", () => {
      aboutPlay.hidden = false;
      aboutPause.hidden = true;
    });
  }
}

/* -----------------------------------------------------------
   Homepage welcome (founder) video — play/pause/sound.
   Deliberately separate from initHeroVideo()/its selectors so the
   hero puppet video and this founder video never control each other.
   ----------------------------------------------------------- */
function initWelcomeVideo() {
  const video = document.querySelector("[data-welcome-video]");
  const playBtn = document.querySelector("[data-welcome-play]");
  const pauseBtn = document.querySelector("[data-welcome-pause]");
  const soundBtn = document.querySelector("[data-welcome-sound]");
  if (!video || !playBtn || !pauseBtn || !soundBtn) return;

  // No autoplay, no loop — video starts paused and waits for a user click.
  video.loop = false;

  playBtn.addEventListener("click", () => {
    video.play();
    playBtn.hidden = true;
    pauseBtn.hidden = false;
  });

  pauseBtn.addEventListener("click", () => {
    video.pause();
    playBtn.hidden = false;
    pauseBtn.hidden = true;
  });

  soundBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    soundBtn.textContent = video.muted ? "Unmute" : "Mute";
    soundBtn.setAttribute(
      "aria-label",
      video.muted ? "Unmute the homepage welcome video" : "Mute the homepage welcome video"
    );
  });

  // Restore the Play button when the video finishes.
  video.addEventListener("ended", () => {
    playBtn.hidden = false;
    pauseBtn.hidden = true;
  });
}

/* -----------------------------------------------------------
   Hero video play/pause control
   ----------------------------------------------------------- */
function initHeroVideo() {
  const video = document.querySelector("[data-hero-video]");
  const playBtn = document.querySelector("[data-video-play]");
  const pauseBtn = document.querySelector("[data-video-pause]");
  if (!video || !playBtn || !pauseBtn) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    video.pause();
  }

  playBtn.addEventListener("click", () => {
    video.play();
    playBtn.hidden = true;
    pauseBtn.hidden = false;
  });

  pauseBtn.addEventListener("click", () => {
    video.pause();
    playBtn.hidden = false;
    pauseBtn.hidden = true;
  });
}

/* -----------------------------------------------------------
   Auto-updating copyright year
   ----------------------------------------------------------- */
function setCopyrightYear() {
  const yearEls = document.querySelectorAll("[data-current-year]");
  yearEls.forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}
