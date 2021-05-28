import bearings from '../../images/bearings.jpg';
import bushings from '../../images/bushings.png';
import decks from '../../images/decks.jpg';
import griptape from '../../images/griptape.jpg';
import hardware from '../../images/hardware.jpg';
import trucks from '../../images/trucks.jpg';
import wheels from '../../images/wheels.jpg';
import undefinedImage from '../../images/undefined.png';

export const getImage = (categoryName: string | undefined): string => {
    if (categoryName === undefined) return undefinedImage;
    switch (categoryName.toLowerCase()) {
        case 'bearings':
            return bearings;
        case 'bushings':
            return bushings;
        case 'decks':
            return decks;
        case 'griptape':
            return griptape;
        case 'hardware':
            return hardware;
        case 'trucks':
            return trucks;
        case 'wheels':
            return wheels;
        default:
            return undefinedImage;
    }
}
