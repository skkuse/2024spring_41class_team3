import ShowerImage from '@/images/1_shower.png';
import TrashImage from '@/images/2_trash.png';
import AirconImage from '@/images/3_aircon.png';
import SmartphoneImage from '@/images/4_smartphone.png';
import CarImage from '@/images/5_car.png';

const Visualize_c = ({inputflag, inputEmission, outputEmission}) => {
    const emission = (inputEmission - outputEmission).toFixed(1);

    var emissionStage = 0;

    emissionStage =
        emission <= 100
            ? 1
            : emission <= 300
                ? 2
                : emission <= 1000
                    ? 3
                    : emission <= 2000
                        ? 4
                        : 5;

    const showerminute = ((emission * 15) / 86).toFixed(1);
    const trashL = ((emission * 5) / 47).toFixed(1);
    const airconminute = ((emission * 10) / 43).toFixed(1);
    const phoneminute = ((emission * 4) / 67).toFixed(1);
    const carkm = (emission / 210).toFixed(1);

    const ctext =
        emissionStage <= 1
            ? '= Shower ' + showerminute + ' minute(s)'
            : emissionStage <= 2
                ? '= Waste ' + trashL + ' L'
                : emissionStage <= 3
                    ? '= Use Airconditioner ' + airconminute + ' minute(s)'
                    : emissionStage <= 4
                        ? '= Use Smartphone ' + phoneminute + ' minute(s)'
                        : '= Drive car ' + carkm + ' km ';
    var image =
        emissionStage <= 1
            ? ShowerImage
            : emissionStage <= 2
                ? TrashImage
                : emissionStage <= 3
                    ? AirconImage
                    : emissionStage <= 4
                        ? SmartphoneImage
                        : CarImage;
    
    if (inputflag) {
        return (
            <div className="flex flex-col items-center overflow-hidden">
                <h2 className="pb-4 text-4xl font-bold tracking-tight">
                    Visualize Carbon Emission
                </h2>
                <div className="container">
                    <div className="box" id="left-box">
                        <div className="box-head">INPUT carbon emission (g)</div>
                        <div className="num">{inputEmission}</div>
                    </div>
                    <div className="box" id="right-box">
                        <div className="box-head">OUTPUT carbon emission (g)</div>
                        <div className="num">{outputEmission}</div>
                    </div>
                    <div className="large-box" id="large-box">
                        <b className="box-head">Effect</b> <br></br>
                        Carbon Emission <b>{emission}g</b> is saved. <br></br>
                        <b>{ctext}</b>
                        <img src={image} alt="Placeholder" />
                    </div>
                </div>
            </div>
        );
    } else
        return (
            <div>
                <strong>Input your code and Be green!</strong>
            </div>
        );
};

export default Visualize_c;