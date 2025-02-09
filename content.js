console.log("'PWA on Chrome OS Integration' extension is running");

const ALT_EVENT_KEYS = [
  '[', ']', // split left and split right
  '=', '-', // maximize and minimize
  '1', '2', '3', '4', '5', '6', '7', '8', '9' // switch application
];

const ALT_CTRL_EVENT_KEYS = [
  '.', ','  // switching account for multiple sign-in
]

const CROS_FUNCTION_KEYS = [
  "ZoomToggle",         // F3
  "LaunchApplication1", // F4
  "BrightnessDown",     // F5
  "BrightnessUp",       // F6
  "MediaPlayPause",     // F7
  "AudioVolumeMute",    // F8
  "AudioVolumeDown",    // F9
  "AudioVolumeUp"       // F10
];

function isCrosAltKey(event) {
  return event.altKey && !event.ctrlKey
    && !event.ctrlKey && ALT_EVENT_KEYS.includes(event.key);
}

function isCrosAltCtrlKey(event) {
  return event.altKey && event.ctrlKey
    && ALT_CTRL_EVENT_KEYS.includes(event.key)
}

function isCrosFuncKey(event) {
  return CROS_FUNCTION_KEYS.includes(event.key);
}

function isDevelopModeKey(event) {
  return event.ctrlKey && event.shiftKey && event.key === "I";
}

function isFullscreen() {
  return document.fullscreenElement != null
}

// Prevent CRD / PWA from capturing system keys
document.addEventListener('keydown', (event) => {
  if (isCrosFuncKey(event)
      // When fullscreen, allows an immersive experience.
      // TODO: Make it a preference.
      || (!isFullscreen() && isCrosAltKey(event))
      || isCrosAltCtrlKey(event)
      || isDevelopModeKey(event)) {
    event.stopPropagation();
  }
  // console.log(event);
}, true);

function setMetaTag(name, content) {
  let metaTag = document.querySelector(`meta[name="${name}"]`);
  if (!metaTag) {
    // Create a new meta tag if it doesn't exist
    metaTag = document.createElement('meta');
    metaTag.name = name;
    document.head.appendChild(metaTag);
  }

  metaTag.content = content;
}

// Prefer darker title bar even in light theme.
setMetaTag('theme-color', '#333333');
