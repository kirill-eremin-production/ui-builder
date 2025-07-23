import { useState, useEffect } from 'react';

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });

    useEffect(() => {
        // Проверяем, что мы в браузере
        if (typeof window === 'undefined') {
            return;
        }

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Добавляем слушатель события resize
        window.addEventListener('resize', handleResize);

        // Устанавливаем начальные значения
        handleResize();

        // Очищаем слушатель при размонтировании
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowSize;
};