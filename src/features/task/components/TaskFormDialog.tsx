import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TaskForm, TaskStatus } from "@/types/task";

type TaskFormDialogProps = {
  open: boolean;
  onOpenChange: (nextOpen: boolean) => void;
  form: TaskForm;
  onSubmit: React.SubmitEventHandler<HTMLFormElement>;
  updateForm: <K extends keyof TaskForm>(key: K, value: TaskForm[K]) => void;
  title: string;
  description: string;
  submitLabel: string;
  trigger?: React.ReactNode;
};

const selectStatusItems: { value: TaskStatus; label: string }[] = [
  { value: "todo", label: "준비 중" },
  { value: "progress", label: "진행 중" },
  { value: "done", label: "완료" },
];

export function TaskFormDialog({
  open,
  onOpenChange,
  form,
  onSubmit,
  updateForm,
  title,
  description,
  submitLabel,
  trigger,
}: TaskFormDialogProps) {
  const currentStatusLabel = selectStatusItems.find(
    (item) => item.value === form.status,
  )?.label;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger}
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Task 제목</FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder="Task 제목"
                value={form.title}
                onChange={(e) => updateForm("title", e.target.value)}
                maxLength={50}
              />
              <FieldDescription className="text-right">
                {form.title.length} / 50
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="description">설명</FieldLabel>
              <Textarea
                id="description"
                name="description"
                placeholder="Task 설명란"
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
                maxLength={300}
              />
              <FieldDescription className="text-right">
                {form.description.length} / 300
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="status">현재 상태</FieldLabel>
              <Select
                id="status"
                name="status"
                value={form.status}
                onValueChange={(value) => {
                  if (value) {
                    updateForm("status", value);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue>{currentStatusLabel}</SelectValue>
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  {selectStatusItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="dueDate">마감 기한(D-day)</FieldLabel>
              <Input
                type="number"
                min={1}
                max={3650}
                id="dueDate"
                name="dueDate"
                value={form.dueDate}
                onChange={(e) => updateForm("dueDate", e.target.value)}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="submit" variant="outline">
              {submitLabel}
            </Button>
            <DialogClose className="inline-flex items-center justify-center rounded-md bg-destructive/70 px-4 py-1 text-sm font-medium text-destructive-foreground hover:bg-destructive/80 transition-colors cursor-pointer">
              Cancel
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
