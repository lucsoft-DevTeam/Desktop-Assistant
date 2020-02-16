import * as QRCode from 'qrcode';

var image = document.createElement('img');
image.style.width = "100vw";
image.style.display = "block";
image.style.imageRendering = "pixelated";
image.ondragstart = function () { return false; };
image.style.transition = "all 250ms ease";
image.style.opacity = "0";

document.body.style.margin = "0";
document.body.style.overflow = "hidden";
document.addEventListener("DOMContentLoaded", () => document.body.append(image));

(window as any).updateQRCode = async (message) =>
{
    try
    {
        image.src = await QRCode.toDataURL(message, { margin: 2 });
        image.style.opacity = "1";
    } catch (error)
    {
        alert('Wrong Args QR Code cant be loaded');
    }
};