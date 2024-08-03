import { View, Text, TextInput } from "react-native";
import React, { useRef, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { globalStyles } from "@/styles/globel";
import { FontAwesome } from "@expo/vector-icons";
import TagInput from "./TagInput";
import PrimaryBtn from "@/components/PrimaryBtn";
import { getCurrentUserId } from "@/query/getCurrentUser";
import { handleProposalCreate } from "@/query/createProposal";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

interface FormValue {
  title: string;
  description: string;
  shortDescription: string;
  price: string;
}

const CreateProposalForm = () => {
  const [tags, setTags] = useState<string[]>([]);
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const descriptionRef = useRef<TextInput>(null);

  const schema = z.object({
    title: z
      .string({ required_error: "Required" })
      .max(30, "Maximum 30 characters"),
    description: z.string().min(8, "Minimum 20 characters"),
    shortDescription: z.string().min(8, "Minimum 8 characters"),
    price: z
      .string()
      .refine((value) => !/\s/.test(value), {
        message: "Spaces not allowed",
      })
      .transform((value) => {
        const parsedNumber = parseFloat(value);
        if (isNaN(parsedNumber)) {
          throw new Error("Invalid number");
        }
        return parsedNumber;
      }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    mode: "onBlur",
  });

  const onSubmit = async (values: FormValue) => {
    setIsLoading(true);
    if (user?.id) {
      const userId = await getCurrentUserId(user?.id);
      const { data } = await handleProposalCreate({
        title: values.title,
        shortDescription: values.shortDescription,
        description: values.description,
        price: values.price,
        tags: tags,
        user: userId?.[0].id || null,
      });
      data?.[0]?.id
        ? router.replace(`/dashboard/search/${data?.[0]?.id}`)
        : null;
      Toast.show({
        type: "success",
        text1: "Proposal created successful.",
        visibilityTime: 2000,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Please Login",
        visibilityTime: 2000,
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <Controller
        name="title"
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            style={[
              globalStyles.TextInput,
              {
                backgroundColor: "#F2F2F2",
                borderWidth: 1,
                borderColor: errors.title ? "#c41e1ea7" : "#cfcfcf",
              },
            ]}
            placeholder="Job title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            returnKeyType="next"
            onSubmitEditing={() => descriptionRef.current?.focus()}
          />
        )}
      />

      {errors.title ? (
        <Text style={globalStyles.formErrorText}>
          {errors?.title?.message?.toString()}
        </Text>
      ) : null}

      <Controller
        name="description"
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            style={[
              globalStyles.TextInput,
              {
                height: 160,
                overflow: "scroll",
                lineHeight: 24,
                textAlignVertical: "top",
                paddingTop: 12,
                paddingBottom: 12,
                backgroundColor: "#F2F2F2",
                borderWidth: 1,
                borderColor: errors.description ? "#c41e1ea7" : "#cfcfcf",
              },
            ]}
            multiline={true}
            ref={descriptionRef}
            placeholder="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      {errors.description ? (
        <Text style={globalStyles.formErrorText}>
          {errors?.description?.message?.toString()}
        </Text>
      ) : null}

      <Controller
        name="shortDescription"
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            style={[
              globalStyles.TextInput,
              {
                height: 160,
                overflow: "scroll",
                lineHeight: 24,
                textAlignVertical: "top",
                paddingTop: 12,
                paddingBottom: 12,
                backgroundColor: "#F2F2F2",
                borderWidth: 1,
                borderColor: errors.shortDescription ? "#c41e1ea7" : "#cfcfcf",
              },
            ]}
            multiline={true}
            placeholder="Short Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      {errors.shortDescription ? (
        <Text style={globalStyles.formErrorText}>
          {errors?.shortDescription?.message?.toString()}
        </Text>
      ) : null}

      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#F2F2F2",
          alignItems: "center",
          borderRadius: 5,
          flex: 1,
          borderWidth: 1,
          borderColor: errors.price ? "#c41e1ea7" : "#cfcfcf",
          height: 52,
        }}
      >
        <View style={{ paddingLeft: 16 }}>
          <FontAwesome name="dollar" size={24} color={"#686868"} />
        </View>
        <Controller
          name="price"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              style={[
                globalStyles.TextInput,
                {
                  backgroundColor: "#F2F2F2",
                  width: "auto",
                  flex: 1,
                  height: "99%",
                },
              ]}
              placeholder="Price"
              keyboardType="number-pad"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>
      {errors.price ? (
        <Text style={globalStyles.formErrorText}>
          {errors?.price?.message?.toString()}
        </Text>
      ) : null}

      <TagInput
        state={tags}
        setState={setTags}
        placeholder="Tags (separate by commas)"
      />

      <View style={{ marginTop: 36 }}>
        <PrimaryBtn
          style={[
            globalStyles.primaryBtn,
            {
              maxWidth: 300,
              marginHorizontal: "auto",
              width: "100%",
              opacity: isLoading ? 0.5 : 1,
            },
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          <Text style={[globalStyles.PrimaryBtnTitle]}>
            {isLoading ? "Creating Proposal" : "Send"}
          </Text>
        </PrimaryBtn>
      </View>
    </>
  );
};

export default CreateProposalForm;
