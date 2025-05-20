import { Component, useState, useRef, onMounted } from "@odoo/owl";
export function useAutofocus (ref) {
   let inputRef = useRef (ref);
   onMounted(() => {
      inputRef.el.focus();
   });
}

