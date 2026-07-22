import { TaskForm } from "@/types/task";

type ValidationResult = { valid: true } | { valid: false; message: string };

export function validateTaskForm(form: TaskForm): ValidationResult {
  const dueDate = Number(form.dueDate);
  if (!form.title.trim()) {
    return {
      valid: false,
      message: "제목을 입력해주세요.",
    };
  }
  if (!form.description.trim()) {
    return {
      valid: false,
      message: "설명을 입력해주세요.",
    };
  }
  if (form.dueDate === "") {
    return {
      valid: false,
      message: "D-day를 입력해주세요.",
    };
  }
  if (dueDate < 1) {
    return {
      valid: false,
      message: "D-day는 1 이상의 값을 입력해주세요.",
    };
  }
  if (dueDate > 3650) {
    return {
      valid: false,
      message: "D-day는 3650 이하의 값을 입력해주세요.",
    };
  }

  return { valid: true };
}
