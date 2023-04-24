"use client";
import React, { useCallback, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { IoMdClose } from "react-icons/io";
import Button from "./Button";
import ClientOnly from "./ClientOnly";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  showTitle: boolean;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  showTitle,
  description,
  children,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <Dialog.Root open={showModal} modal>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay
          className="
          bg-neutral-700/50
          absolute
          top-0
        animate-overlayShow
        w-full
        h-screen
        z-1
        "
        />
        <Dialog.Content
          aria-describedby={description}
          className={`
        fixed
        top-1/2
        left-1/2
        z-50
        -translate-x-1/2
        -translate-y-1/2
        p-6
        animate-contentShow
        bg-white
        rounded-md
        `}
        >
          <Dialog.Close
            className="rounded-full h-5 w-5 inline-flex items-center justify-center absolute top-6 right-5"
            onClick={handleClose}
          >
            <IoMdClose size={18} />
          </Dialog.Close>

          {showTitle ? (
            <Dialog.Title className="margin-0 font-medium text-slate-950 leading-normal">
              {title}
            </Dialog.Title>
          ) : (
            <VisuallyHidden.Root>
              <Dialog.Title>{title}</Dialog.Title>
            </VisuallyHidden.Root>
          )}

          {description && (
            <Dialog.Description className="m-[10px_0_20px] text-slate-700 leading-normal">
              {description}
            </Dialog.Description>
          )}

          {children}

          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-4 w-full">
              {secondaryAction && secondaryActionLabel && (
                <Button
                  outline
                  disabled={disabled}
                  label={secondaryActionLabel}
                  onClick={handleSecondaryAction}
                />
              )}
              <Button
                disabled={disabled}
                label={actionLabel}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
