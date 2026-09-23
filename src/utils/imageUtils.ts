/**
 * Utility for processing and compressing user-uploaded avatar images from device gallery.
 * Resizes images to a crisp 320x320 square JPEG data URL so it stores compactly in localStorage.
 */
export async function processGalleryImage(file: File, maxSize = 320): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Faqat rasm fayllarini yuklash mumkin!');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error('Rasmni o‘qishda xatolik yuz berdi.'));
    };

    reader.onload = () => {
      const img = new Image();
      img.onerror = () => {
        reject(new Error('Rasm formatini yuklab bo‘lmadi.'));
      };

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Square crop (center) for avatar
          const minSide = Math.min(width, height);
          const startX = (width - minSide) / 2;
          const startY = (height - minSide) / 2;

          const targetSize = Math.min(minSide, maxSize);
          canvas.width = targetSize;
          canvas.height = targetSize;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(reader.result as string);
            return;
          }

          // High quality image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          ctx.drawImage(
            img,
            startX,
            startY,
            minSide,
            minSide,
            0,
            0,
            targetSize,
            targetSize
          );

          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          resolve(compressedDataUrl);
        } catch {
          // Fallback to raw data url
          resolve(reader.result as string);
        }
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  });
}
