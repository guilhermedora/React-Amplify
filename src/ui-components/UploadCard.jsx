/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import MyIcon from "./MyIcon";
import { Flex, Text } from "@aws-amplify/ui-react";
export default function UploadCard(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="0"
      direction="column"
      width="unset"
      height="338px"
      justifyContent="center"
      alignItems="center"
      position="relative"
      borderRadius="80px"
      padding="20px 20px 20px 20px"
      backgroundColor="rgba(238,67,43,1)"
      {...getOverrideProps(overrides, "UploadCard")}
      {...rest}
    >
      <Flex
        gap="17px"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="center"
        alignItems="center"
        shrink="0"
        position="relative"
        border="5px SOLID rgba(255,255,255,0.1)"
        boxShadow="0px 2px 6px rgba(0.05098039284348488, 0.10196078568696976, 0.14901961386203766, 0.15000000596046448)"
        borderRadius="80px"
        padding="35px 35px 35px 35px"
        backgroundColor="rgba(0,64,77,1)"
        {...getOverrideProps(overrides, "Frame 373")}
      >
        <Flex
          gap="0"
          direction="row"
          width="69px"
          height="70px"
          justifyContent="center"
          alignItems="center"
          shrink="0"
          position="relative"
          borderRadius="8px"
          padding="8px 8px 8px 8px"
          {...getOverrideProps(overrides, "Frame 430")}
        >
          <MyIcon
            width="57px"
            height="59px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            overflow="hidden"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            type="Upload"
            {...getOverrideProps(overrides, "MyIcon5893456")}
          ></MyIcon>
        </Flex>
        <Text
          fontFamily="Inter"
          fontSize="24px"
          fontWeight="600"
          color="rgba(255,255,255,1)"
          lineHeight="30px"
          textAlign="center"
          display="block"
          direction="column"
          justifyContent="unset"
          width="543px"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Click or drop a files if you want to upload from computer"
          {...getOverrideProps(
            overrides,
            "Click or drop a files if you want to upload from computer"
          )}
        ></Text>
        <MyIcon
          width="72px"
          height="55px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          overflow="hidden"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          type="Plus"
          {...getOverrideProps(overrides, "MyIcon5897502")}
        ></MyIcon>
      </Flex>
    </Flex>
  );
}
