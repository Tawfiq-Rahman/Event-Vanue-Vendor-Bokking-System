// Cards request small images, but a hero spans the full viewport width.
// Asking for a larger source keeps the hero sharp instead of upscaling the card image.
export const heroSrc = (url) => url.replace(/w=\d+/, 'w=2000');
