/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Button, Flex, Text } from "@aws-amplify/ui-react";
import MyIcon from "./MyIcon";
export default function MainMenu(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="10px"
      direction="column"
      width="680px"
      height="330px"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      position="relative"
      borderRadius="10px"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(48,64,80,1)"
      {...getOverrideProps(overrides, "MainMenu")}
      {...rest}
    >
      <Button
        width="unset"
        height="77.33px"
        shrink="0"
        alignSelf="stretch"
        backgroundColor="rgba(239,67,43,1)"
        size="large"
        isDisabled={false}
        variation="primary"
        children="Upload Image"
        {...getOverrideProps(overrides, "Button58521661")}
      ></Button>
      <Button
        width="unset"
        height="77px"
        shrink="0"
        alignSelf="stretch"
        backgroundColor="rgba(239,67,43,1)"
        size="large"
        isDisabled={false}
        variation="primary"
        children="List Image"
        {...getOverrideProps(overrides, "Button58521669")}
      ></Button>
      <Button
        width="unset"
        height="77px"
        shrink="0"
        alignSelf="stretch"
        backgroundColor="rgba(239,67,43,1)"
        size="large"
        isDisabled={false}
        variation="primary"
        children="Logout"
        {...getOverrideProps(overrides, "Button5878425")}
      ></Button>
      <Flex
        gap="24px"
        direction="row"
        width="366px"
        height="40px"
        justifyContent="center"
        alignItems="center"
        shrink="0"
        position="relative"
        borderRadius="50px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(255,255,255,1)"
        {...getOverrideProps(overrides, "Frame 2858521642")}
      >
        <Flex
          gap="8px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="center"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Frame 2858521643")}
        >
          <MyIcon
            width="24px"
            height="24px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            overflow="hidden"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            type="instagram"
            {...getOverrideProps(overrides, "MyIcon58521644")}
          ></MyIcon>
          <Text
            fontFamily="Inter"
            fontSize="14px"
            fontWeight="400"
            color="rgba(13,26,38,1)"
            lineHeight="24px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Instagram"
            {...getOverrideProps(overrides, "Instagram")}
          ></Text>
        </Flex>
        <Flex
          gap="8px"
          direction="row"
          width="unset"
          height="36px"
          justifyContent="flex-start"
          alignItems="center"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Frame 30")}
        >
          <MyIcon
            width="29px"
            height="27px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            overflow="hidden"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            type="twitter"
            {...getOverrideProps(overrides, "MyIcon58521647")}
          ></MyIcon>
          <Text
            fontFamily="Inter"
            fontSize="14px"
            fontWeight="400"
            color="rgba(13,26,38,1)"
            lineHeight="24px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Twitter"
            {...getOverrideProps(overrides, "Twitter")}
          ></Text>
        </Flex>
        <Flex
          gap="10px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="center"
          alignItems="center"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          backgroundColor="rgba(255,255,255,1)"
          {...getOverrideProps(overrides, "Frame 1")}
        >
          <MyIcon
            width="24px"
            height="22px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            overflow="hidden"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            type="Linkedin"
            {...getOverrideProps(overrides, "MyIcon58571877")}
          ></MyIcon>
          <Text
            fontFamily="Inter"
            fontSize="14px"
            fontWeight="400"
            color="rgba(13,26,38,1)"
            lineHeight="24px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            width="57px"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Linkedin"
            {...getOverrideProps(overrides, "Linkedin")}
          ></Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
