/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ImageCreateFormInputValues = {
    name?: string;
    path?: string;
    owner?: string;
};
export declare type ImageCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    path?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ImageCreateFormOverridesProps = {
    ImageCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    path?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ImageCreateFormProps = React.PropsWithChildren<{
    overrides?: ImageCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ImageCreateFormInputValues) => ImageCreateFormInputValues;
    onSuccess?: (fields: ImageCreateFormInputValues) => void;
    onError?: (fields: ImageCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ImageCreateFormInputValues) => ImageCreateFormInputValues;
    onValidate?: ImageCreateFormValidationValues;
} & React.CSSProperties>;
export default function ImageCreateForm(props: ImageCreateFormProps): React.ReactElement;
