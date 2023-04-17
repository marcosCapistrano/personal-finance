"use client";
import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  showTitle: boolean;
  description?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  showTitle,
  description,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryLabel,
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
    <Dialog.Root open={isOpen}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay
          className="
        bg-neutral-800/70
        fixed
        inset-0
        "
        />
        <Dialog.Content
          aria-describedby={description}
          className={`
        fixed
        top-1/3
        left-1/2
        z-50
        -translate-x-1/2
        -translate-y-1/3
        w-full
        md:w-4/6
        lg:w-3/6
        xl:w-2/5
        p-6
        bg-white
        translate
        duration-600
        ${showModal ? "translate-y-0" : "translate-y-full"}
        ${showModal ? "opacity-100" : "opacity-0"}
        `}
        >
          <div
            className="
            flex
            items-center
            rounded-t
            justify-end
            relative border-b-[1px]
            h-10
            "
          >
            <button
              onClick={handleClose}
              className="
                border-0
                hover:opacity-70
                transition
                absolute
                right-1
                top-1"
            >
                <IoMdClose size={18} />
            </button>
          </div>
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

          <Dialog.Close></Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
