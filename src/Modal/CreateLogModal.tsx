import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  DatePicker,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { getLocalTimeZone, now } from "@internationalized/date";

interface ICreateLogModalProps {
  open: boolean;
  closeModal: () => void;
  onFinish: (x: number, y: 1 | 2 | 3 | 4) => void;
}

const CreateLogModal = ({
  open,
  closeModal,
  onFinish,
}: ICreateLogModalProps) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState<any>(1);
  const events: {
    key: 1 | 2 | 3 | 4;
    value: string;
  }[] = [
    {
      key: 1,
      value: "Off",
    },
    {
      key: 2,
      value: "SB",
    },
    {
      key: 3,
      value: "D",
    },
    {
      key: 4,
      value: "On",
    },
  ];
  const parseEventValue = (e: string) => {
    const value = parseInt(e);
    setY(value);
  };
  return (
    <Modal isOpen={open} onOpenChange={closeModal}>
      <ModalContent>
        <ModalHeader>Create log</ModalHeader>
        <ModalBody>
          <Select
            label="Select Event"
            onChange={(e) => parseEventValue(e.target.value)}
          >
            {events.map((value) => (
              <SelectItem key={value.key}>{value.value}</SelectItem>
            ))}
          </Select>
          <DatePicker
            aria-label="Modal picker"
            variant="bordered"
            hideTimeZone
            showMonthAndYearPickers
            defaultValue={now(getLocalTimeZone())}
            maxValue={now(getLocalTimeZone())}
            onChange={(e) =>
              setX(new Date(e.set({ second: 0 }).toDate()).getTime())
            }
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={closeModal}>
            Close
          </Button>
          <Button color="success" onClick={() => onFinish(x, y)}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateLogModal;
