import { MouseEventHandler } from "react";
import classes from "./button.module.css";

interface ButtonProps {
  onClickHandler: MouseEventHandler<HTMLButtonElement> | undefined;
  type: "button" | "submit" | "reset";
  topRigth: boolean;
  topLeft: boolean;
  bottomRigth: boolean;
  bottomLeft: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClickHandler,
  type,
  topRigth,
  topLeft,
  bottomLeft,
  bottomRigth,
}) => {
  return (
    <button className={classes.btn} type={type} onClick={onClickHandler}>
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.165 12.4572L13.1634 12.0995C13.1513 10.6805 13.0666 9.41455 12.9206 8.61225C12.9206 8.59778 12.7613 7.80207 12.6599 7.53721C12.5006 7.15438 12.2126 6.82941 11.8515 6.62353C11.5624 6.47663 11.2592 6.40207 10.9417 6.40207C10.6922 6.41375 10.2806 6.54062 9.98692 6.64699L9.74283 6.7415C8.12612 7.39031 5.03561 9.51034 3.85199 10.8068L3.76473 10.8975L3.37527 11.3221C3.12982 11.6471 3 12.0444 3 12.4717C3 12.8545 3.11563 13.2374 3.3469 13.5468C3.41614 13.647 3.52766 13.7756 3.62693 13.8842L4.006 14.2851C5.31046 15.6204 8.13485 17.4934 9.59883 18.114C9.59883 18.1274 10.5086 18.5113 10.9417 18.5258H10.9995C11.6639 18.5258 12.2846 18.143 12.6021 17.5242C12.6888 17.355 12.772 17.0237 12.8352 16.7327L12.949 16.1832C13.0788 15.2995 13.165 13.9441 13.165 12.4572ZM19.4967 13.9979C20.3269 13.9979 21 13.3113 21 12.4644C21 11.6175 20.3269 10.9308 19.4967 10.9308L15.7975 11.2613C15.1463 11.2613 14.6183 11.7989 14.6183 12.4644C14.6183 13.1288 15.1463 13.6674 15.7975 13.6674L19.4967 13.9979Z"
          fill="#616161"
        />
      </svg>
      <div
        className={classes.BR}
        style={{ opacity: bottomRigth ? 1 : 0 }}
      ></div>
      <div className={classes.TR} style={{ opacity: topRigth ? 1 : 0 }}></div>
      <div className={classes.TL} style={{ opacity: topLeft ? 1 : 0 }}></div>
      <div className={classes.BL} style={{ opacity: bottomLeft ? 1 : 0 }}></div>
    </button>
  );
};

export default Button;
