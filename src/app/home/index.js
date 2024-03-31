import React, { useRef, useState } from "react";
import useStyle from "./stylesheet";
let stack = [];
const ImagePixelManipulation = () => {
    const classes = useStyle();
    const [Histo, setHisto] = useState(null);
    const [menu1, setMenu1] = useState(true);
    const [menu2, setMenu2] = useState(false);
    const [menu3, setMenu3] = useState(false);
    const inputRefDownloadFormat = useRef(null);
    const manipulatedCanvasRef = useRef(null);
    const originalCanvasRef = useRef(null);
    const inputRefTreshold = useRef(null);
    const inputRefHeuCount = useRef(null);
    const inputRefTopX = useRef(null);
    const inputRefTopY = useRef(null);
    const inputRefBotX = useRef(null);
    const inputRefBotY = useRef(null);
    const inputRef = useRef(null);

    const handleImageUpload = () => {
        const originalCanvas = originalCanvasRef.current;
        const manipulatedCanvas = manipulatedCanvasRef.current;

        const originalCtx = originalCanvas.getContext("2d");
        const manipulatedCtx = manipulatedCanvas.getContext("2d");

        const input = inputRef.current;

        if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;

                img.onload = () => {
                    // Orijinal Canvas'a resmi çiz
                    originalCanvas.width = manipulatedCanvas.width = img.width;
                    originalCanvas.height = manipulatedCanvas.height =
                        img.height;
                    originalCtx.drawImage(img, 0, 0, img.width, img.height);
                    originalCopy();
                };
            };

            reader.readAsDataURL(input.files[0]);
        }
    };

    const originalCopy = () => {
        const originalCanvas = originalCanvasRef.current;
        const manipulatedCanvas = manipulatedCanvasRef.current;

        const originalCtx = originalCanvas.getContext("2d");
        const manipulatedCtx = manipulatedCanvas.getContext("2d");

        // Orijinal ImageData'nın kopyasını al
        const imageData = originalCtx.getImageData(
            0,
            0,
            originalCanvas.width,
            originalCanvas.height
        );
        const originalData = new Uint8ClampedArray(imageData.data);

        // Piksel manipülasyonlarını uygula
        //orjinalini al hiçbir manipülasyon yapma.
        // Yeni boyutlara göre kanvası ayarla
        manipulatedCanvas.width = originalCanvas.width;
        manipulatedCanvas.height = originalCanvas.height;

        // Manipüle edilmiş veriyi kullanarak ikinci canvas'a çiz
        manipulatedCtx.putImageData(
            new ImageData(
                originalData,
                manipulatedCanvas.width,
                manipulatedCanvas.height
            ),
            0,
            0
        );
        setHisto(Histogram());
    };

    const manipulatedCopy = () => {
        const originalCanvas = originalCanvasRef.current;
        const manipulatedCanvas = manipulatedCanvasRef.current;

        const originalCtx = originalCanvas.getContext("2d");
        const manipulatedCtx = manipulatedCanvas.getContext("2d");

        // Orijinal ImageData'nın kopyasını al
        const imageData = manipulatedCtx.getImageData(
            0,
            0,
            manipulatedCanvas.width,
            manipulatedCanvas.height
        );
        const manipulatedData = new Uint8ClampedArray(imageData.data);

        // Piksel manipülasyonlarını uygula
        //orjinalini al hiçbir manipülasyon yapma.
        // Yeni boyutlara göre kanvası ayarla
        originalCanvas.width = manipulatedCanvas.width;
        originalCanvas.height = manipulatedCanvas.height;

        // Manipüle edilmiş veriyi kullanarak ikinci canvas'a çiz
        originalCtx.putImageData(
            new ImageData(
                manipulatedData,
                originalCanvas.width,
                originalCanvas.height
            ),
            0,
            0
        );
    };

    const stackMenuOriginalData = () => {
        const originalCanvas = originalCanvasRef.current;
        const manipulatedCanvas = manipulatedCanvasRef.current;

        const originalCtx = originalCanvas.getContext("2d");
        const manipulatedCtx = manipulatedCanvas.getContext("2d");

        // Orijinal ImageData'nın kopyasını al
        const imageData = originalCtx.getImageData(
            0,
            0,
            originalCanvas.width,
            originalCanvas.height
        );
        const originalData = new Uint8ClampedArray(imageData.data);
        const width = originalCanvas.width;
        const height = originalCanvas.height;
        const originalDatas = [originalData, width, height];
        stack.push(originalDatas);
    };

    const ColorfulToGray = () => {
        const originalCanvas = originalCanvasRef.current;
        const manipulatedCanvas = manipulatedCanvasRef.current;

        const originalCtx = originalCanvas.getContext("2d");
        const manipulatedCtx = manipulatedCanvas.getContext("2d");

        // Orijinal ImageData'nın kopyasını al
        const imageData = originalCtx.getImageData(
            0,
            0,
            originalCanvas.width,
            originalCanvas.height
        );
        const originalData = new Uint8ClampedArray(imageData.data);

        // Piksel manipülasyonlarını uygula (örneğin,gri seviyeli yapma)
        for (let i = 0; i < originalData.length; i += 4) {
            const gray =
                (originalData[i] + originalData[i + 1] + originalData[i + 2]) /
                3;
            originalData[i] = gray; // kırmızı
            originalData[i + 1] = gray; // yeşil
            originalData[i + 2] = gray; // mavi
        }
        // Yeni boyutlara göre kanvası ayarla
        manipulatedCanvas.width = originalCanvas.width;
        manipulatedCanvas.height = originalCanvas.height;

        // Manipüle edilmiş veriyi kullanarak ikinci canvas'a çiz
        manipulatedCtx.putImageData(
            new ImageData(
                originalData,
                originalCanvas.width,
                originalCanvas.height
            ),
            0,
            0
        );
        setHisto(Histogram());
    };

    const ColorfulToBinary = (treshold) => {
        const originalCanvas = originalCanvasRef.current;
        const manipulatedCanvas = manipulatedCanvasRef.current;

        const originalCtx = originalCanvas.getContext("2d");
        const manipulatedCtx = manipulatedCanvas.getContext("2d");

        // Orijinal ImageData'nın kopyasını al
        const imageData = originalCtx.getImageData(
            0,
            0,
            originalCanvas.width,
            originalCanvas.height
        );
        const originalData = new Uint8ClampedArray(imageData.data);
        let tresholdValue = 0;
        // Piksel manipülasyonlarını uygula (örneğin, siyah beyaz yapma)
        for (let i = 0; i < originalData.length; i += 4) {
            const gray =
                (originalData[i] + originalData[i + 1] + originalData[i + 2]) /
                3;
            tresholdValue += gray;
        }
        console.log(treshold);
        tresholdValue /= originalData.length / 4;
        tresholdValue = treshold == "" ? tresholdValue : treshold;

        for (let i = 0; i < originalData.length; i += 4) {
            const gray =
                (originalData[i] + originalData[i + 1] + originalData[i + 2]) /
                3;
            if (gray < tresholdValue) {
                originalData[i] = 0; // kırmızı
                originalData[i + 1] = 0; // yeşil
                originalData[i + 2] = 0; // mavi
            } else {
                originalData[i] = 255; // kırmızı
                originalData[i + 1] = 255; // yeşil
                originalData[i + 2] = 255; // mavi
            }
        }
        // Yeni boyutlara göre kanvası ayarla
        manipulatedCanvas.width = originalCanvas.width;
        manipulatedCanvas.height = originalCanvas.height;

        // Manipüle edilmiş veriyi kullanarak ikinci canvas'a çiz
        manipulatedCtx.putImageData(
            new ImageData(
                originalData,
                originalCanvas.width,
                originalCanvas.height
            ),
            0,
            0
        );
        setHisto(Histogram());
    };

    const ZoomIn = () => {
        const originalCanvas = originalCanvasRef.current;
        const manipulatedCanvas = manipulatedCanvasRef.current;

        const originalCtx = originalCanvas.getContext("2d");
        const manipulatedCtx = manipulatedCanvas.getContext("2d");

        // Orijinal ImageData'nın kopyasını al
        const imageData = originalCtx.getImageData(
            0,
            0,
            originalCanvas.width,
            originalCanvas.height
        );

        const canvasWidth = originalCanvas.width;
        const canvasHeight = originalCanvas.height;
        const newWidth = canvasWidth * 2 - 1;
        const newHeight = canvasHeight * 2 - 1;
        const zoomInPixelCount = newWidth * newHeight * 4;
        const newPixelData = new Uint8ClampedArray(zoomInPixelCount);

        // Her bir piksel için manipülasyon zoom in
        for (let i = 0; i < canvasHeight; i++) {
            for (let j = 0; j < canvasWidth; j++) {
                // Orjinal pikselin konumu
                const originalIndex = (i * canvasWidth + j) * 4;

                // Yeni pikselin konumu
                const newIndex = (i * 2 * newWidth + j * 2) * 4;

                // Yeni pikseli kopyala
                newPixelData[newIndex] = imageData.data[originalIndex];
                newPixelData[newIndex + 1] = imageData.data[originalIndex + 1];
                newPixelData[newIndex + 2] = imageData.data[originalIndex + 2];
                newPixelData[newIndex + 3] = imageData.data[originalIndex + 3];

                // Yanındaki ve altındaki boş alanları doldur
                if (j < canvasWidth - 1) {
                    const nextIndex = (i * 2 * newWidth + (j * 2 + 1)) * 4;
                    newPixelData[nextIndex] =
                        (imageData.data[originalIndex] +
                            imageData.data[originalIndex + 4]) /
                        2;
                    newPixelData[nextIndex + 1] =
                        (imageData.data[originalIndex + 1] +
                            imageData.data[originalIndex + 5]) /
                        2;
                    newPixelData[nextIndex + 2] =
                        (imageData.data[originalIndex + 2] +
                            imageData.data[originalIndex + 6]) /
                        2;
                    newPixelData[nextIndex + 3] =
                        (imageData.data[originalIndex + 3] +
                            imageData.data[originalIndex + 7]) /
                        2;
                }

                if (i < canvasHeight - 1) {
                    const belowIndex = ((i * 2 + 1) * newWidth + j * 2) * 4;
                    newPixelData[belowIndex] =
                        (imageData.data[originalIndex] +
                            imageData.data[originalIndex + canvasWidth * 4]) /
                        2;
                    newPixelData[belowIndex + 1] =
                        (imageData.data[originalIndex + 1] +
                            imageData.data[
                                originalIndex + canvasWidth * 4 + 1
                            ]) /
                        2;
                    newPixelData[belowIndex + 2] =
                        (imageData.data[originalIndex + 2] +
                            imageData.data[
                                originalIndex + canvasWidth * 4 + 2
                            ]) /
                        2;
                    newPixelData[belowIndex + 3] =
                        (imageData.data[originalIndex + 3] +
                            imageData.data[
                                originalIndex + canvasWidth * 4 + 3
                            ]) /
                        2;
                }
            }
        }

        // Yeni boyutlara göre kanvası ayarla
        manipulatedCanvas.width = newWidth;
        manipulatedCanvas.height = newHeight;

        // Manipüle edilmiş veriyi kullanarak ikinci canvas'a çiz
        manipulatedCtx.putImageData(
            new ImageData(newPixelData, newWidth, newHeight),
            0,
            0
        );
        setHisto(Histogram());
    };

    const ZoomOut = () => {
        const originalCanvas = originalCanvasRef.current;
        const manipulatedCanvas = manipulatedCanvasRef.current;

        const originalCtx = originalCanvas.getContext("2d");
        const manipulatedCtx = manipulatedCanvas.getContext("2d");

        // Orijinal ImageData'nın kopyasını al
        const imageData = originalCtx.getImageData(
            0,
            0,
            originalCanvas.width,
            originalCanvas.height
        );

        const canvasWidth = originalCanvas.width;
        const canvasHeight = originalCanvas.height;
        const newWidth = Math.floor(canvasWidth / 3);
        const newHeight = Math.floor(canvasHeight / 3);
        const zoomOutPixelCount = newWidth * newHeight * 4;
        const newPixelData = new Uint8ClampedArray(zoomOutPixelCount);

        // Piksel manipülasyonlarını uygula (örneğin, zoom out yapma)
        let k = 0;
        for (let i = 0; i < newHeight; i++) {
            for (let j = 0; j < newWidth; j++) {
                const originalIndex1 = (i * 3 * canvasWidth + j * 3) * 4;
                const originalIndex2 = originalIndex1 + 4;
                const originalIndex3 = originalIndex1 + 2 * canvasWidth * 4;
                const originalIndex4 = originalIndex3 + 4;

                // R, G, B değerlerini topla ve 3'e bölerek ortalamayı al
                const avgR = Math.floor(
                    (imageData.data[originalIndex1] +
                        imageData.data[originalIndex2] +
                        imageData.data[originalIndex3] +
                        imageData.data[originalIndex4]) /
                        4
                );
                const avgG = Math.floor(
                    (imageData.data[originalIndex1 + 1] +
                        imageData.data[originalIndex2 + 1] +
                        imageData.data[originalIndex3 + 1] +
                        imageData.data[originalIndex4 + 1]) /
                        4
                );
                const avgB = Math.floor(
                    (imageData.data[originalIndex1 + 2] +
                        imageData.data[originalIndex2 + 2] +
                        imageData.data[originalIndex3 + 2] +
                        imageData.data[originalIndex4 + 2]) /
                        4
                );
                const avgA = Math.floor(
                    (imageData.data[originalIndex1 + 3] +
                        imageData.data[originalIndex2 + 3] +
                        imageData.data[originalIndex3 + 3] +
                        imageData.data[originalIndex4 + 3]) /
                        4
                );

                // Yeni pikseli yeni veri dizisine yerleştir
                newPixelData[k] = avgR;
                newPixelData[k + 1] = avgG;
                newPixelData[k + 2] = avgB;
                newPixelData[k + 3] = avgA;
                k += 4;
            }
        }

        // Yeni boyutlara göre kanvası ayarla
        manipulatedCanvas.width = newWidth;
        manipulatedCanvas.height = newHeight;

        // Manipüle edilmiş veriyi kullanarak ikinci canvas'a çiz
        manipulatedCtx.putImageData(
            new ImageData(newPixelData, newWidth, newHeight),
            0,
            0
        );
        setHisto(Histogram());
    };

    const CropImage = (topX, topY, botX, botY) => {
        const originalCanvas = originalCanvasRef.current;
        const manipulatedCanvas = manipulatedCanvasRef.current;

        const originalCtx = originalCanvas.getContext("2d");
        const manipulatedCtx = manipulatedCanvas.getContext("2d");

        // Orijinal ImageData'nın kopyasını al
        const imageData = originalCtx.getImageData(
            0,
            0,
            originalCanvas.width,
            originalCanvas.height
        );

        const canvasWidth = originalCanvas.width;
        const canvasHeight = originalCanvas.height;
        const newWidth = botX - topX + 1;
        const newHeight = botY - topY + 1;
        const cropPixelCount = newWidth * newHeight * 4;
        const newPixelData = new Uint8ClampedArray(cropPixelCount);

        // Piksel manipülasyonlarını uygula
        let k = 0;
        for (let i = 0; i < canvasHeight; i++) {
            for (let j = 0; j < canvasWidth; j++) {
                if (i >= topY && i <= botY && j >= topX && j <= botX) {
                    const originalIndex = (i * canvasWidth + j) * 4;
                    newPixelData[k] = imageData.data[originalIndex];
                    newPixelData[k + 1] = imageData.data[originalIndex + 1];
                    newPixelData[k + 2] = imageData.data[originalIndex + 2];
                    newPixelData[k + 3] = imageData.data[originalIndex + 3];
                    k += 4;
                }
            }
        }
        // Yeni boyutlara göre kanvası ayarla
        manipulatedCanvas.width = newWidth;
        manipulatedCanvas.height = newHeight;

        // Manipüle edilmiş veriyi kullanarak ikinci canvas'a çiz
        manipulatedCtx.putImageData(
            new ImageData(newPixelData, newWidth, newHeight),
            0,
            0
        );
        setHisto(Histogram());
    };

    const OffsetHistogram = () => {
        ColorfulToGray();
        const levelList = new Array(256).fill(0);

        const manipulatedCanvas = manipulatedCanvasRef.current;
        const manipulatedCtx = manipulatedCanvas.getContext("2d");
        const manipulatedData = manipulatedCtx.getImageData(
            0,
            0,
            manipulatedCanvas.width,
            manipulatedCanvas.height
        );

        for (let i = 0; i < manipulatedData.data.length; i += 4) {
            levelList[manipulatedData.data[i]]++;
        }
        let average = 0;
        let grayHistogram = Array(256).fill(0);
        for (let i = 0; i < 256; i++) {
            average = levelList[i];
            grayHistogram[i] = Math.floor(average);
        }
        let kumulatifSumArray = Array(256).fill(0);
        for (let i = 0; i < 256; i++) {
            for (let j = i; j > -1; j--) {
                kumulatifSumArray[i] += grayHistogram[j];
            }
        }
        let kumulatifPossibilityArray = Array(256).fill(0);
        for (let i = 0; i < 256; i++) {
            kumulatifPossibilityArray[i] =
                kumulatifSumArray[i] / kumulatifSumArray[255];
        }
        let offsetHistogramArray = Array(256).fill(0);
        for (let i = 0; i < 256; i++) {
            offsetHistogramArray[i] = Math.round(
                kumulatifPossibilityArray[i] * 256
            );
        }
        const data = new Uint8ClampedArray(manipulatedData.data);
        for (let i = 0; i < data.length; i += 4) {
            const average = data[i];

            let x = offsetHistogramArray[Math.floor(average)];

            data[i] = x;
            data[i + 1] = x;
            data[i + 2] = x;
        }

        manipulatedCtx.putImageData(
            new ImageData(
                data,
                manipulatedCanvas.width,
                manipulatedCanvas.height
            ),
            0,
            0
        );
        setHisto(Histogram());
    };

    const Quantization = (hueCount) => {
        ColorfulToGray();
        const manipulatedCanvas = manipulatedCanvasRef.current;
        const manipulatedCtx = manipulatedCanvas.getContext("2d");

        const imageData = manipulatedCtx.getImageData(
            0,
            0,
            manipulatedCanvas.width,
            manipulatedCanvas.height
        );
        const manipulatedData = new Uint8ClampedArray(imageData.data);
        const quantizationRange = 256 / hueCount;
        // Piksel manipülasyonlarını uygula (örneğin,nicemleme)
        for (let i = 0; i < manipulatedData.length; i += 4) {
            const gray =
                Math.floor(manipulatedData[i] / quantizationRange) *
                quantizationRange;
            manipulatedData[i] = gray; // kırmızı
            manipulatedData[i + 1] = gray; // yeşil
            manipulatedData[i + 2] = gray; // mavi
        }

        // Manipüle edilmiş veriyi kullanarak ikinci canvas'a çiz
        manipulatedCtx.putImageData(
            new ImageData(
                manipulatedData,
                manipulatedCanvas.width,
                manipulatedCanvas.height
            ),
            0,
            0
        );
        setHisto(Histogram());
    };

    const Histogram = () => {
        const redList = new Array(256).fill(0);
        const greenList = new Array(256).fill(0);
        const blueList = new Array(256).fill(0);

        const manipulatedCanvas = manipulatedCanvasRef.current;
        const manipulatedCtx = manipulatedCanvas.getContext("2d");
        const imageData = manipulatedCtx.getImageData(
            0,
            0,
            manipulatedCanvas.width,
            manipulatedCanvas.height
        );

        for (let i = 0; i < imageData.data.length; i += 4) {
            redList[imageData.data[i]]++; // kırmızı
            greenList[imageData.data[i + 1]]++; // yeşil
            blueList[imageData.data[i + 2]]++; // mavi
        }

        const histogramColumns = (dataCounts) => {
            return dataCounts.map((count, index) => (
                <div
                    key={index}
                    style={{
                        WebkitTextFillColor: "yellow",
                        writingMode: "vertical-rl",
                        height: `${count / 10}px`,
                        backgroundColor: "black",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        fontSize: 5,
                        width: 2.5,
                        bottom: 0,
                    }}
                >
                    {index}/{count}
                </div>
            ));
        };

        const colors = ["red", "green", "blue"];
        const colorCounts = [redList, greenList, blueList];

        return (
            <div>
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className={classes.histogramContainer}
                        style={{ backgroundColor: color }}
                    >
                        {histogramColumns(colorCounts[index])}
                    </div>
                ))}
            </div>
        );
    };
    const downloadAs = (format) => {
        const canvas = manipulatedCanvasRef.current;
        const imgElement = document.createElement("img");
        imgElement.src = canvas.toDataURL(`image/${format}`);
        const link = document.createElement("a");
        link.download = `filtered.${format}`;
        link.href = imgElement.src;
        link.click();
    };

    return (
        <div className={classes.container}>
            <div className={classes.canvasContainer}>
                <canvas ref={originalCanvasRef} />
                <canvas ref={manipulatedCanvasRef} />
            </div>
            {menu1 && (
                <div>
                    <div
                        className={classes.menu}
                        style={{ backgroundColor: "darkgray" }}
                    >
                        <input
                            type="file"
                            ref={inputRef}
                            onChange={handleImageUpload}
                        />
                        <button onClick={ColorfulToGray}>
                            Gri Resme Dönüştür
                        </button>
                        <div className={classes.inputMenuContainer}>
                            <input
                                type="number"
                                placeholder="eşik değer"
                                ref={inputRefTreshold}
                            ></input>
                            <button
                                onClick={() => {
                                    ColorfulToBinary(
                                        inputRefTreshold.current.value
                                    );
                                }}
                            >
                                Siyah Beyaz Resme Dönüştür
                            </button>
                        </div>
                        <button onClick={ZoomIn}>Yakınlaştır</button>
                        <button onClick={ZoomOut}>Uzaklaştır</button>
                        <div className={classes.inputMenuContainer}>
                            <input
                                type="number"
                                placeholder="topX"
                                ref={inputRefTopX}
                            ></input>
                            <input
                                type="number"
                                placeholder="topY"
                                ref={inputRefTopY}
                            ></input>
                            <input
                                type="number"
                                placeholder="botX"
                                ref={inputRefBotX}
                            ></input>
                            <input
                                type="number"
                                placeholder="botY"
                                ref={inputRefBotY}
                            ></input>
                            <button
                                onClick={() => {
                                    CropImage(
                                        inputRefTopX.current.value,
                                        inputRefTopY.current.value,
                                        inputRefBotX.current.value,
                                        inputRefBotY.current.value
                                    );
                                }}
                            >
                                Resmi Kes
                            </button>
                        </div>
                    </div>
                    <div
                        className={classes.menu}
                        style={{ backgroundColor: "gray" }}
                    >
                        <button
                            onClick={() => {
                                setMenu1(false);
                                setMenu2(true);
                                stackMenuOriginalData();
                                manipulatedCopy();
                            }}
                        >
                            {"Sonraki"}
                        </button>
                    </div>
                </div>
            )}
            {menu2 && (
                <div>
                    <div
                        className={classes.menu}
                        style={{ backgroundColor: "darkgray" }}
                    >
                        <button onClick={OffsetHistogram}>
                            Histogram Denkleştir
                        </button>
                        <div className={classes.inputMenuContainer}>
                            <input
                                placeholder="ton sayısı"
                                ref={inputRefHeuCount}
                                type="number"
                            ></input>
                            <button
                                onClick={() => {
                                    Quantization(
                                        inputRefHeuCount.current.value
                                    );
                                }}
                            >
                                Görüntü Nicemle
                            </button>
                        </div>
                    </div>
                    <div
                        className={classes.menu}
                        style={{ backgroundColor: "gray" }}
                    >
                        <button
                            onClick={() => {
                                setMenu2(false);
                                setMenu1(true);
                                const endData = stack.pop();
                                const originalCanvas =
                                    originalCanvasRef.current;
                                const orgCtx = originalCanvas.getContext("2d");
                                originalCanvas.width = endData[1];
                                originalCanvas.height = endData[2];
                                orgCtx.putImageData(
                                    new ImageData(
                                        endData[0],
                                        endData[1],
                                        endData[2]
                                    ),
                                    0,
                                    0
                                );
                                originalCopy();
                            }}
                        >
                            {"Önceki"}
                        </button>
                        <button
                            onClick={() => {
                                setMenu2(false);
                                setMenu3(true);
                            }}
                        >
                            {"Sonraki"}
                        </button>
                    </div>
                </div>
            )}
            <div
                className={classes.menu}
                style={{ backgroundColor: "darkgray" }}
            >
                <input
                    placeholder="png or bmp or jpg"
                    ref={inputRefDownloadFormat}
                ></input>
                <button
                    onClick={() => {
                        downloadAs(inputRefDownloadFormat.current.value);
                    }}
                >
                    download
                </button>
            </div>
            {Histo}
        </div>
    );
};

export default ImagePixelManipulation;
