import dayImage from './assets/windowmidday.png';
import nightImage from './assets/windownight.png';
import sunsetImage from './assets/windowlate.png';
import sunriseImage from './assets/windowearly.png';

export default function setColorAndImage(currentTime, sunsetTime, sunriseTime) {
    // Convert sunset and sunrise times to minutes since midnight
    const sunsetMinutes = (sunsetTime.getHours() * 60) + sunsetTime.getMinutes();
    const sunriseMinutes = (sunriseTime.getHours() * 60) + sunriseTime.getMinutes();
    const currentMinutes = (currentTime.getHours() * 60) + currentTime.getMinutes();

    let wallpaper, imageSrc;

    if (currentMinutes >= sunriseMinutes && currentMinutes < sunriseMinutes + 90) {
        // Sunrise period
        wallpaper = 'radial-gradient(farthest-corner at 50% 50%, #FFEBCD 45%, #FFD700 100%)';
        imageSrc = sunriseImage;
    } else if (currentMinutes >= sunriseMinutes + 60 && currentMinutes < sunsetMinutes - 60) {
        // Daytime period
        wallpaper = 'radial-gradient(farthest-corner at 50% 50%, #87CEFA 25%, #c9ebff 100%)';
        imageSrc = dayImage;
    } else if (currentMinutes >= sunsetMinutes - 90 && currentMinutes < sunsetMinutes-15) {
        // Before sunset period
        wallpaper = 'radial-gradient(farthest-corner at 50% 50%, #FFDAB9 45%, #FFA07A 100%)';
        imageSrc = sunsetImage;
    } else if (currentMinutes >= sunsetMinutes-15 && currentMinutes < sunsetMinutes+15) {
        // Sunset period
        wallpaper = 'radial-gradient(farthest-corner at 50% 50%, #FA8072 45%, #FF6347 100%)';
        imageSrc = sunsetImage;
    } else if (currentMinutes >= sunsetMinutes + 15 || currentMinutes < sunriseMinutes) {
        // Night period
        wallpaper = 'radial-gradient(farthest-corner at 50% 50%, #000033 45%, #000000 100%)';
        imageSrc = nightImage;
    } else {
        // Default to day image and color
        wallpaper = 'radial-gradient(farthest-corner at 50% 50%, #FFFFFF 10%, #FFFFFF 100%)';
        imageSrc = dayImage;
    }

    document.documentElement.style.setProperty('--backgroundWallpaper', wallpaper);

    return imageSrc;
}
