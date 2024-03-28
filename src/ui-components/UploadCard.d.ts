/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { MyIconProps } from "./MyIcon";
import { FlexProps, TextProps } from "@aws-amplify/ui-react";
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
export declare type UploadCardOverridesProps = {
    UploadCard?: PrimitiveOverrideProps<FlexProps>;
    "Frame 373"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 430"?: PrimitiveOverrideProps<FlexProps>;
    MyIcon5893456?: MyIconProps;
    "Click or drop a files if you want to upload from computer"?: PrimitiveOverrideProps<TextProps>;
    MyIcon5897502?: MyIconProps;
} & EscapeHatchProps;
export declare type UploadCardProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: UploadCardOverridesProps | undefined | null;
}>;
export default function UploadCard(props: UploadCardProps): React.ReactElement;
