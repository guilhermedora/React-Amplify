/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { ButtonProps, FlexProps, TextProps } from "@aws-amplify/ui-react";
import { MyIconProps } from "./MyIcon";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MainMenuOverridesProps = {
    MainMenu?: PrimitiveOverrideProps<FlexProps>;
    Button58521661?: PrimitiveOverrideProps<ButtonProps>;
    Button58521669?: PrimitiveOverrideProps<ButtonProps>;
    Button5878425?: PrimitiveOverrideProps<ButtonProps>;
    "Frame 2858521642"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 2858521643"?: PrimitiveOverrideProps<FlexProps>;
    MyIcon58521644?: MyIconProps;
    Instagram?: PrimitiveOverrideProps<TextProps>;
    "Frame 30"?: PrimitiveOverrideProps<FlexProps>;
    MyIcon58521647?: MyIconProps;
    Twitter?: PrimitiveOverrideProps<TextProps>;
    "Frame 1"?: PrimitiveOverrideProps<FlexProps>;
    MyIcon58571877?: MyIconProps;
    Linkedin?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type MainMenuProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: MainMenuOverridesProps | undefined | null;
}>;
export default function MainMenu(props: MainMenuProps): React.ReactElement;
