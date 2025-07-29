import { ChevronDown } from "@tamagui/lucide-icons";
import { Adapt, Select, Sheet } from "tamagui";
import { toCapitalize } from "utilities";

type Props = {
  val: string;
  setValue: (value: string) => void;
  options: string[];
  label: string;
};

export function Dropdown({ val, setValue, options, label }: Props) {
  return (
    <Select value={val} onValueChange={setValue}>
      <Select.Trigger maxWidth={220} iconAfter={ChevronDown}>
        <Select.Value placeholder={label} />
      </Select.Trigger>

      <Adapt when="maxMd" platform="touch">
        <Sheet modal dismissOnSnapToBottom animation="medium">
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            bg="$shadowColor"
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content>
        <Select.ScrollUpButton />
        <Select.Viewport>
          <Select.Group>
            <Select.Label>{label}</Select.Label>
            {options.map((opt, idx) => (
              <Select.Item index={idx} key={opt} value={opt}>
                <Select.ItemText>{toCapitalize(opt)}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton />
      </Select.Content>
    </Select>
  );
}
