const ALT_EVENT_KEYS = [
    '[', ']', '=', '-',
    '1', '2', '3', '4', '5', '6', '7', '8', '9'
];

const ALT_CTRL_EVENT_KEYS = [
    '.', ','
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
    return event.altKey && !event.ctrlKey && ALT_EVENT_KEYS.includes(event.key);
}

function isCrosAltCtrlKey(event) {
    return event.altKey && event.ctrlKey && ALT_CTRL_EVENT_KEYS.includes(event.key)
}

function isCrosFuncKey(event) {
    return CROS_FUNCTION_KEYS.includes(event.key);
}

function isDevelopModeKey(event) {
    return event.ctrlKey && event.shiftKey && event.key === "I";
}

console.log("'PWA on Chrome OS Integration' extension is running");

function isFullscreen() {
    return document.fullscreenElement != null
}

// Prevent CRD / PWA from capturing system keys
document.addEventListener('keydown', (event) => {
    if (isCrosFuncKey(event)
        || (!isFullscreen() && isCrosAltKey(event))
        || isCrosAltCtrlKey(event)
        || isDevelopModeKey(event)) {
        event.stopPropagation();
    }
    // console.log(event);
}, true);
