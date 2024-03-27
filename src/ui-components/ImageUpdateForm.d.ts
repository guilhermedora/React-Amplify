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
export declare type ImageUpdateFormInputValues = {
    name?: string;
    path?: string;
    owner?: string;
};
export declare type ImageUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    path?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ImageUpdateFormOverridesProps = {
    ImageUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    path?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ImageUpdateFormProps = React.PropsWithChildren<{
    overrides?: ImageUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    image?: any;
    onSubmit?: (fields: ImageUpdateFormInputValues) => ImageUpdateFormInputValues;
    onSuccess?: (fields: ImageUpdateFormInputValues) => void;
    onError?: (fields: ImageUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ImageUpdateFormInputValues) => ImageUpdateFormInputValues;
    onValidate?: ImageUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ImageUpdateForm(props: ImageUpdateFormProps): React.ReactElement;
