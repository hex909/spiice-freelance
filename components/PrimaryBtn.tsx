import { MotiPressable, MotiPressableProps } from "moti/interactions";
import { useMemo } from "react";

const PrimaryBtn = ({ children, ...rest }: MotiPressableProps) => {
  return (
    <MotiPressable
      animate={useMemo(
        () =>
          ({ hovered, pressed }) => {
            "worklet";

            return {
              opacity: hovered || pressed ? 0.8 : 1,
              scale: hovered || pressed ? 0.95 : 1,
            };
          },
        []
      )}
      transition={useMemo(
        () =>
          ({ hovered, pressed }) => {
            "worklet";

            return {
              delay: hovered || pressed ? 0 : 100,
            };
          },
        []
      )}
      {...rest}
    >
      {children}
    </MotiPressable>
  );
};
export default PrimaryBtn;
