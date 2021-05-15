export const getImagePath = (categoryName: string): string => {
    switch (categoryName.toLowerCase()) {
        case 'bearings':
            return 'bearings.jpg';
        case 'bushings':
            return 'bushings.png';
        case 'decks':
            return 'decks.jpg';
        case 'griptape':
            return 'griptape.jpg';
        case 'hardware':
            return 'hardware.jpg';
        case 'wheels':
            return 'wheels.jpg';
        default:
            return 'undefined.png';
    }
}