import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, NavLink, useLocation, Link, useLoaderData } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import { useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { XIcon, PanelLeftIcon, CheckIcon, UserIcon, ListCheckIcon, ChevronDownIcon, ChevronUpIcon, PencilIcon, Trash2Icon, Bot, User, Send, BookOpen, ClipboardList, Clock, Lightbulb, CheckCircle, FlaskConical, Code } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { IconDots, IconFolder, IconShare3, IconTrash, IconCirclePlusFilled, IconMail, IconDotsVertical, IconUserCircle, IconCreditCard, IconNotification, IconLogout, IconInnerShadowTop, IconDashboard, IconListDetails, IconChartBar, IconUsers, IconDatabase, IconReport, IconFileWord, IconSettings, IconHelp, IconSearch, IconTrendingUp, IconTrendingDown, IconLayoutColumns, IconChevronDown } from "@tabler/icons-react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as RechartsPrimitive from "recharts";
import { AreaChart, CartesianGrid, XAxis, Area } from "recharts";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { useReactTable, getFacetedUniqueValues, getFacetedRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import "dotenv/config";
import * as process$1 from "node:process";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import * as runtime from "@prisma/client/runtime/library";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { z } from "zod";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(void 0);
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Root, { "data-slot": "sheet", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxs(
      SheetPrimitive.Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsx(XIcon, { className: "size-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
function SheetDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Description,
    {
      "data-slot": "sheet-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TooltipPrimitive.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    TooltipPrimitive.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(TooltipPrimitive.Arrow, { className: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SidebarContext = React.createContext(null);
function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
  }, [isMobile, setOpen, setOpenMobile]);
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
  const state = open ? "expanded" : "collapsed";
  const contextValue = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );
  return /* @__PURE__ */ jsx(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: {
        "--sidebar-width": SIDEBAR_WIDTH,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        ...style
      },
      className: cn(
        "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
        className
      ),
      ...props,
      children
    }
  ) }) });
}
function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  if (collapsible === "none") {
    return /* @__PURE__ */ jsx(
      "div",
      {
        "data-slot": "sidebar",
        className: cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className
        ),
        ...props,
        children
      }
    );
  }
  if (isMobile) {
    return /* @__PURE__ */ jsx(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ jsxs(
      SheetContent,
      {
        "data-sidebar": "sidebar",
        "data-slot": "sidebar",
        "data-mobile": "true",
        className: "bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",
        style: {
          "--sidebar-width": SIDEBAR_WIDTH_MOBILE
        },
        side,
        children: [
          /* @__PURE__ */ jsxs(SheetHeader, { className: "sr-only", children: [
            /* @__PURE__ */ jsx(SheetTitle, { children: "Sidebar" }),
            /* @__PURE__ */ jsx(SheetDescription, { children: "Displays the mobile sidebar." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex h-full w-full flex-col", children })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "group peer text-sidebar-foreground hidden md:block",
      "data-state": state,
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": side,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "sidebar-gap",
            className: cn(
              "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "sidebar-container",
            className: cn(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
              side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              className
            ),
            ...props,
            children: /* @__PURE__ */ jsx(
              "div",
              {
                "data-sidebar": "sidebar",
                "data-slot": "sidebar-inner",
                className: "bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
                children
              }
            )
          }
        )
      ]
    }
  );
}
function SidebarTrigger({
  className,
  onClick,
  ...props
}) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon",
      className: cn("size-7", className),
      onClick: (event) => {
        onClick == null ? void 0 : onClick(event);
        toggleSidebar();
      },
      ...props,
      children: [
        /* @__PURE__ */ jsx(PanelLeftIcon, {}),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function SidebarInset({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "main",
    {
      "data-slot": "sidebar-inset",
      className: cn(
        "bg-background relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      ),
      ...props
    }
  );
}
function SidebarHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      ),
      ...props
    }
  );
}
function SidebarGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: cn("relative flex w-full min-w-0 flex-col p-2", className),
      ...props
    }
  );
}
function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "div";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-group-label",
      "data-sidebar": "group-label",
      className: cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      ),
      ...props
    }
  );
}
function SidebarGroupContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-group-content",
      "data-sidebar": "group-content",
      className: cn("w-full text-sm", className),
      ...props
    }
  );
}
function SidebarMenu({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "ul",
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: cn("flex w-full min-w-0 flex-col gap-1", className),
      ...props
    }
  );
}
function SidebarMenuItem({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative", className),
      ...props
    }
  );
}
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();
  const button = /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      ...props
    }
  );
  if (!tooltip) {
    return button;
  }
  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    };
  }
  return /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: button }),
    /* @__PURE__ */ jsx(
      TooltipContent,
      {
        side: "right",
        align: "center",
        hidden: state !== "collapsed" || isMobile,
        ...tooltip
      }
    )
  ] });
}
function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-menu-action",
      "data-sidebar": "menu-action",
      className: cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover && "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
        className
      ),
      ...props
    }
  );
}
function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Trigger,
    {
      "data-slot": "dropdown-menu-trigger",
      ...props
    }
  );
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        className
      ),
      ...props
    }
  ) });
}
function DropdownMenuGroup({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Group, { "data-slot": "dropdown-menu-group", ...props });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      checked,
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-4" }) }) }),
        children
      ]
    }
  );
}
function DropdownMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": inset,
      className: cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: cn("bg-border -mx-1 my-1 h-px", className),
      ...props
    }
  );
}
function NavDocuments({
  items
}) {
  const { isMobile } = useSidebar();
  return /* @__PURE__ */ jsxs(SidebarGroup, { className: "group-data-[collapsible=icon]:hidden", children: [
    /* @__PURE__ */ jsx(SidebarGroupLabel, { children: "Documents" }),
    /* @__PURE__ */ jsxs(SidebarMenu, { children: [
      items.map((item) => /* @__PURE__ */ jsxs(SidebarMenuItem, { children: [
        /* @__PURE__ */ jsx(SidebarMenuButton, { asChild: true, children: /* @__PURE__ */ jsxs("a", { href: item.url, children: [
          /* @__PURE__ */ jsx(item.icon, {}),
          /* @__PURE__ */ jsx("span", { children: item.name })
        ] }) }),
        /* @__PURE__ */ jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
            SidebarMenuAction,
            {
              showOnHover: true,
              className: "data-[state=open]:bg-accent rounded-sm",
              children: [
                /* @__PURE__ */ jsx(IconDots, {}),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "More" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs(
            DropdownMenuContent,
            {
              className: "w-24 rounded-lg",
              side: isMobile ? "bottom" : "right",
              align: isMobile ? "end" : "start",
              children: [
                /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
                  /* @__PURE__ */ jsx(IconFolder, {}),
                  /* @__PURE__ */ jsx("span", { children: "Open" })
                ] }),
                /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
                  /* @__PURE__ */ jsx(IconShare3, {}),
                  /* @__PURE__ */ jsx("span", { children: "Share" })
                ] }),
                /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
                /* @__PURE__ */ jsxs(DropdownMenuItem, { variant: "destructive", children: [
                  /* @__PURE__ */ jsx(IconTrash, {}),
                  /* @__PURE__ */ jsx("span", { children: "Delete" })
                ] })
              ]
            }
          )
        ] })
      ] }, item.name)),
      /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxs(SidebarMenuButton, { className: "text-sidebar-foreground/70", children: [
        /* @__PURE__ */ jsx(IconDots, { className: "text-sidebar-foreground/70" }),
        /* @__PURE__ */ jsx("span", { children: "More" })
      ] }) })
    ] })
  ] });
}
function NavMain({
  items
}) {
  return /* @__PURE__ */ jsx(SidebarGroup, { children: /* @__PURE__ */ jsxs(SidebarGroupContent, { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsx(SidebarMenu, { children: /* @__PURE__ */ jsxs(SidebarMenuItem, { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        SidebarMenuButton,
        {
          asChild: true,
          tooltip: "Quick Create",
          className: "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear",
          children: /* @__PURE__ */ jsxs(NavLink, { to: "/tasks/new", children: [
            /* @__PURE__ */ jsx(IconCirclePlusFilled, {}),
            /* @__PURE__ */ jsx("span", { children: "Quick Create" })
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          size: "icon",
          className: "size-8 group-data-[collapsible=icon]:opacity-0",
          variant: "outline",
          children: [
            /* @__PURE__ */ jsx(IconMail, {}),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Inbox" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(SidebarMenu, { children: items.map((item) => /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(SidebarMenuButton, { tooltip: item.title, asChild: true, children: /* @__PURE__ */ jsxs(NavLink, { to: item.url, children: [
      item.icon && /* @__PURE__ */ jsx(item.icon, {}),
      /* @__PURE__ */ jsx("span", { children: item.title })
    ] }) }) }, item.title)) })
  ] }) });
}
function NavSecondary({
  items,
  ...props
}) {
  return /* @__PURE__ */ jsx(SidebarGroup, { ...props, children: /* @__PURE__ */ jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsx(SidebarMenu, { children: items.map((item) => /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(SidebarMenuButton, { asChild: true, children: /* @__PURE__ */ jsxs("a", { href: item.url, children: [
    /* @__PURE__ */ jsx(item.icon, {}),
    /* @__PURE__ */ jsx("span", { children: item.title })
  ] }) }) }, item.title)) }) }) });
}
function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Root,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  );
}
function AvatarImage({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Image,
    {
      "data-slot": "avatar-image",
      className: cn("aspect-square size-full", className),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      ),
      ...props
    }
  );
}
function NavUser({
  user
}) {
  const { isMobile } = useSidebar();
  return /* @__PURE__ */ jsx(SidebarMenu, { children: /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      SidebarMenuButton,
      {
        size: "lg",
        className: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
        children: [
          /* @__PURE__ */ jsxs(Avatar, { className: "h-8 w-8 rounded-lg grayscale", children: [
            /* @__PURE__ */ jsx(AvatarImage, { src: user.avatar, alt: user.name }),
            /* @__PURE__ */ jsx(AvatarFallback, { className: "rounded-lg", children: "CN" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid flex-1 text-left text-sm leading-tight", children: [
            /* @__PURE__ */ jsx("span", { className: "truncate font-medium", children: user.name }),
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground truncate text-xs", children: user.email })
          ] }),
          /* @__PURE__ */ jsx(IconDotsVertical, { className: "ml-auto size-4" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(
      DropdownMenuContent,
      {
        className: "w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg",
        side: isMobile ? "bottom" : "right",
        align: "end",
        sideOffset: 4,
        children: [
          /* @__PURE__ */ jsx(DropdownMenuLabel, { className: "p-0 font-normal", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-1 py-1.5 text-left text-sm", children: [
            /* @__PURE__ */ jsxs(Avatar, { className: "h-8 w-8 rounded-lg", children: [
              /* @__PURE__ */ jsx(AvatarImage, { src: user.avatar, alt: user.name }),
              /* @__PURE__ */ jsx(AvatarFallback, { className: "rounded-lg", children: "CN" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid flex-1 text-left text-sm leading-tight", children: [
              /* @__PURE__ */ jsx("span", { className: "truncate font-medium", children: user.name }),
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground truncate text-xs", children: user.email })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxs(DropdownMenuGroup, { children: [
            /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
              /* @__PURE__ */ jsx(IconUserCircle, {}),
              "Account"
            ] }),
            /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
              /* @__PURE__ */ jsx(IconCreditCard, {}),
              "Billing"
            ] }),
            /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
              /* @__PURE__ */ jsx(IconNotification, {}),
              "Notifications"
            ] })
          ] }),
          /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
            /* @__PURE__ */ jsx(IconLogout, {}),
            "Log out"
          ] })
        ]
      }
    )
  ] }) }) });
}
const data$1 = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg"
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard
    },
    {
      title: "Users",
      url: "/users",
      icon: UserIcon
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: ListCheckIcon
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: IconListDetails
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar
    },
    {
      title: "Projects",
      url: "#",
      icon: IconFolder
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers
    }
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch
    }
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord
    }
  ]
};
function AppSidebar({ ...props }) {
  return /* @__PURE__ */ jsxs(Sidebar, { collapsible: "offcanvas", ...props, children: [
    /* @__PURE__ */ jsx(SidebarHeader, { children: /* @__PURE__ */ jsx(SidebarMenu, { children: /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(
      SidebarMenuButton,
      {
        asChild: true,
        className: "data-[slot=sidebar-menu-button]:!p-1.5",
        children: /* @__PURE__ */ jsxs("a", { href: "#", children: [
          /* @__PURE__ */ jsx(IconInnerShadowTop, { className: "!size-5" }),
          /* @__PURE__ */ jsx("span", { className: "text-base font-semibold", children: "AndreSDS" })
        ] })
      }
    ) }) }) }),
    /* @__PURE__ */ jsxs(SidebarContent, { children: [
      /* @__PURE__ */ jsx(NavMain, { items: data$1.navMain }),
      /* @__PURE__ */ jsx(NavDocuments, { items: data$1.documents }),
      /* @__PURE__ */ jsx(NavSecondary, { items: data$1.navSecondary, className: "mt-auto" })
    ] }),
    /* @__PURE__ */ jsx(SidebarFooter, { children: /* @__PURE__ */ jsx(NavUser, { user: data$1.user }) })
  ] });
}
const ROUTE_TITLES = {
  "/": "Dashboard",
  "/dashboard": "Dashboard",
  "/tasks": "Tasks",
  "/task/new": "Nova Task",
  "/task/edit": "Editar Task",
  "/users": "Usuarios"
};
function SiteHeader() {
  const location = useLocation();
  function getTitleFromPathname() {
    return ROUTE_TITLES[location.pathname] || "Not Found";
  }
  return /* @__PURE__ */ jsx("header", { className: "flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6", children: [
    /* @__PURE__ */ jsx(SidebarTrigger, { className: "-ml-1" }),
    /* @__PURE__ */ jsx(
      Separator,
      {
        orientation: "vertical",
        className: "mx-2 data-[orientation=vertical]:h-4"
      }
    ),
    /* @__PURE__ */ jsx("h1", { className: "text-base font-medium", children: getTitleFromPathname() }),
    /* @__PURE__ */ jsx("div", { className: "ml-auto flex items-center gap-2", children: /* @__PURE__ */ jsx(Button, { variant: "ghost", asChild: true, size: "sm", className: "hidden sm:flex", children: /* @__PURE__ */ jsx(
      "a",
      {
        href: "https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard",
        rel: "noopener noreferrer",
        target: "_blank",
        className: "dark:text-foreground",
        children: "GitHub"
      }
    ) }) })
  ] }) });
}
const layout = UNSAFE_withComponentProps(function() {
  return /* @__PURE__ */ jsxs(SidebarProvider, {
    style: {
      "--sidebar-width": "calc(var(--spacing) * 72)",
      "--header-height": "calc(var(--spacing) * 12)"
    },
    children: [/* @__PURE__ */ jsx(AppSidebar, {
      variant: "inset"
    }), /* @__PURE__ */ jsxs(SidebarInset, {
      children: [/* @__PURE__ */ jsx(SiteHeader, {}), /* @__PURE__ */ jsx("div", {
        className: "flex flex-1 flex-col",
        children: /* @__PURE__ */ jsx("div", {
          className: "@container/main flex flex-1 flex-col gap-2",
          children: /* @__PURE__ */ jsx(Outlet, {})
        })
      })]
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: layout
}, Symbol.toStringTag, { value: "Module" }));
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function CardAction({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-action",
      className: cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function CardFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-footer",
      className: cn("flex items-center px-6 [.border-t]:pt-6", className),
      ...props
    }
  );
}
function SectionCards() {
  return /* @__PURE__ */ jsxs("div", { className: "*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4", children: [
    /* @__PURE__ */ jsxs(Card, { className: "@container/card", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardDescription, { children: "Total Revenue" }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-semibold tabular-nums @[250px]/card:text-3xl", children: "$1,250.00" }),
        /* @__PURE__ */ jsx(CardAction, { children: /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
          /* @__PURE__ */ jsx(IconTrendingUp, {}),
          "+12.5%"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(CardFooter, { className: "flex-col items-start gap-1.5 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "line-clamp-1 flex gap-2 font-medium", children: [
          "Trending up this month ",
          /* @__PURE__ */ jsx(IconTrendingUp, { className: "size-4" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: "Visitors for the last 6 months" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "@container/card", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardDescription, { children: "New Customers" }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-semibold tabular-nums @[250px]/card:text-3xl", children: "1,234" }),
        /* @__PURE__ */ jsx(CardAction, { children: /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
          /* @__PURE__ */ jsx(IconTrendingDown, {}),
          "-20%"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(CardFooter, { className: "flex-col items-start gap-1.5 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "line-clamp-1 flex gap-2 font-medium", children: [
          "Down 20% this period ",
          /* @__PURE__ */ jsx(IconTrendingDown, { className: "size-4" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: "Acquisition needs attention" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "@container/card", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardDescription, { children: "Active Accounts" }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-semibold tabular-nums @[250px]/card:text-3xl", children: "45,678" }),
        /* @__PURE__ */ jsx(CardAction, { children: /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
          /* @__PURE__ */ jsx(IconTrendingUp, {}),
          "+12.5%"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(CardFooter, { className: "flex-col items-start gap-1.5 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "line-clamp-1 flex gap-2 font-medium", children: [
          "Strong user retention ",
          /* @__PURE__ */ jsx(IconTrendingUp, { className: "size-4" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: "Engagement exceed targets" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "@container/card", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardDescription, { children: "Growth Rate" }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-semibold tabular-nums @[250px]/card:text-3xl", children: "4.5%" }),
        /* @__PURE__ */ jsx(CardAction, { children: /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
          /* @__PURE__ */ jsx(IconTrendingUp, {}),
          "+4.5%"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(CardFooter, { className: "flex-col items-start gap-1.5 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "line-clamp-1 flex gap-2 font-medium", children: [
          "Steady performance increase ",
          /* @__PURE__ */ jsx(IconTrendingUp, { className: "size-4" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: "Meets growth projections" })
      ] })
    ] })
  ] });
}
const THEMES = { light: "", dark: ".dark" };
const ChartContext = React.createContext(null);
function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}
function ChartContainer({
  id,
  className,
  children,
  config: config2,
  ...props
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
  return /* @__PURE__ */ jsx(ChartContext.Provider, { value: { config: config2 }, children: /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": "chart",
      "data-chart": chartId,
      className: cn(
        "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(ChartStyle, { id: chartId, config: config2 }),
        /* @__PURE__ */ jsx(RechartsPrimitive.ResponsiveContainer, { children })
      ]
    }
  ) });
}
const ChartStyle = ({ id, config: config2 }) => {
  const colorConfig = Object.entries(config2).filter(
    ([, config22]) => config22.theme || config22.color
  );
  if (!colorConfig.length) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(THEMES).map(
          ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
            var _a;
            const color = ((_a = itemConfig.theme) == null ? void 0 : _a[theme]) || itemConfig.color;
            return color ? `  --color-${key}: ${color};` : null;
          }).join("\n")}
}
`
        ).join("\n")
      }
    }
  );
};
const ChartTooltip = RechartsPrimitive.Tooltip;
function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey
}) {
  const { config: config2 } = useChart();
  const tooltipLabel = React.useMemo(() => {
    var _a;
    if (hideLabel || !(payload == null ? void 0 : payload.length)) {
      return null;
    }
    const [item] = payload;
    const key = `${labelKey || (item == null ? void 0 : item.dataKey) || (item == null ? void 0 : item.name) || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config2, item, key);
    const value = !labelKey && typeof label === "string" ? ((_a = config2[label]) == null ? void 0 : _a.label) || label : itemConfig == null ? void 0 : itemConfig.label;
    if (labelFormatter) {
      return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: labelFormatter(value, payload) });
    }
    if (!value) {
      return null;
    }
    return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: value });
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config2,
    labelKey
  ]);
  if (!active || !(payload == null ? void 0 : payload.length)) {
    return null;
  }
  const nestLabel = payload.length === 1 && indicator !== "dot";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      ),
      children: [
        !nestLabel ? tooltipLabel : null,
        /* @__PURE__ */ jsx("div", { className: "grid gap-1.5", children: payload.filter((item) => item.type !== "none").map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config2, item, key);
          const indicatorColor = color || item.payload.fill || item.color;
          return /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                indicator === "dot" && "items-center"
              ),
              children: formatter && (item == null ? void 0 : item.value) !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ jsxs(Fragment, { children: [
                (itemConfig == null ? void 0 : itemConfig.icon) ? /* @__PURE__ */ jsx(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: cn(
                      "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                      {
                        "h-2.5 w-2.5": indicator === "dot",
                        "w-1": indicator === "line",
                        "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                        "my-0.5": nestLabel && indicator === "dashed"
                      }
                    ),
                    style: {
                      "--color-bg": indicatorColor,
                      "--color-border": indicatorColor
                    }
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center"
                    ),
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
                        nestLabel ? tooltipLabel : null,
                        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: (itemConfig == null ? void 0 : itemConfig.label) || item.name })
                      ] }),
                      item.value && /* @__PURE__ */ jsx("span", { className: "text-foreground font-mono font-medium tabular-nums", children: item.value.toLocaleString() })
                    ]
                  }
                )
              ] })
            },
            item.dataKey
          );
        }) })
      ]
    }
  );
}
function getPayloadConfigFromPayload(config2, payload, key) {
  if (typeof payload !== "object" || payload === null) {
    return void 0;
  }
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
  let configLabelKey = key;
  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key];
  }
  return configLabelKey in config2 ? config2[configLabelKey] : config2[key];
}
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Root, { "data-slot": "select", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    SelectPrimitive.Content,
    {
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      ...props,
      children: [
        /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
      ]
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronUpIcon, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4" })
    }
  );
}
const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default"
});
function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ToggleGroupPrimitive.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": variant,
      "data-size": size,
      className: cn(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ToggleGroupContext.Provider, { value: { variant, size }, children })
    }
  );
}
function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}) {
  const context = React.useContext(ToggleGroupContext);
  return /* @__PURE__ */ jsx(
    ToggleGroupPrimitive.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": context.variant || variant,
      "data-size": context.size || size,
      className: cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size
        }),
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        className
      ),
      ...props,
      children
    }
  );
}
const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 }
];
const chartConfig = {
  visitors: {
    label: "Visitors"
  },
  desktop: {
    label: "Desktop",
    color: "var(--primary)"
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)"
  }
};
function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");
  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = /* @__PURE__ */ new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });
  return /* @__PURE__ */ jsxs(Card, { className: "@container/card", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Total Visitors" }),
      /* @__PURE__ */ jsxs(CardDescription, { children: [
        /* @__PURE__ */ jsx("span", { className: "hidden @[540px]/card:block", children: "Total for the last 3 months" }),
        /* @__PURE__ */ jsx("span", { className: "@[540px]/card:hidden", children: "Last 3 months" })
      ] }),
      /* @__PURE__ */ jsxs(CardAction, { children: [
        /* @__PURE__ */ jsxs(
          ToggleGroup,
          {
            type: "single",
            value: timeRange,
            onValueChange: setTimeRange,
            variant: "outline",
            className: "hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex",
            children: [
              /* @__PURE__ */ jsx(ToggleGroupItem, { value: "90d", children: "Last 3 months" }),
              /* @__PURE__ */ jsx(ToggleGroupItem, { value: "30d", children: "Last 30 days" }),
              /* @__PURE__ */ jsx(ToggleGroupItem, { value: "7d", children: "Last 7 days" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(Select, { value: timeRange, onValueChange: setTimeRange, children: [
          /* @__PURE__ */ jsx(
            SelectTrigger,
            {
              className: "flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden",
              size: "sm",
              "aria-label": "Select a value",
              children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Last 3 months" })
            }
          ),
          /* @__PURE__ */ jsxs(SelectContent, { className: "rounded-xl", children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "90d", className: "rounded-lg", children: "Last 3 months" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "30d", className: "rounded-lg", children: "Last 30 days" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "7d", className: "rounded-lg", children: "Last 7 days" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { className: "px-2 pt-4 sm:px-6 sm:pt-6", children: /* @__PURE__ */ jsx(
      ChartContainer,
      {
        config: chartConfig,
        className: "aspect-auto h-[250px] w-full",
        children: /* @__PURE__ */ jsxs(AreaChart, { data: filteredData, children: [
          /* @__PURE__ */ jsxs("defs", { children: [
            /* @__PURE__ */ jsxs("linearGradient", { id: "fillDesktop", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx(
                "stop",
                {
                  offset: "5%",
                  stopColor: "var(--color-desktop)",
                  stopOpacity: 1
                }
              ),
              /* @__PURE__ */ jsx(
                "stop",
                {
                  offset: "95%",
                  stopColor: "var(--color-desktop)",
                  stopOpacity: 0.1
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("linearGradient", { id: "fillMobile", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx(
                "stop",
                {
                  offset: "5%",
                  stopColor: "var(--color-mobile)",
                  stopOpacity: 0.8
                }
              ),
              /* @__PURE__ */ jsx(
                "stop",
                {
                  offset: "95%",
                  stopColor: "var(--color-mobile)",
                  stopOpacity: 0.1
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(CartesianGrid, { vertical: false }),
          /* @__PURE__ */ jsx(
            XAxis,
            {
              dataKey: "date",
              tickLine: false,
              axisLine: false,
              tickMargin: 8,
              minTickGap: 32,
              tickFormatter: (value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric"
                });
              }
            }
          ),
          /* @__PURE__ */ jsx(
            ChartTooltip,
            {
              cursor: false,
              content: /* @__PURE__ */ jsx(
                ChartTooltipContent,
                {
                  labelFormatter: (value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric"
                    });
                  },
                  indicator: "dot"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            Area,
            {
              dataKey: "mobile",
              type: "natural",
              fill: "url(#fillMobile)",
              stroke: "var(--color-mobile)",
              stackId: "a"
            }
          ),
          /* @__PURE__ */ jsx(
            Area,
            {
              dataKey: "desktop",
              type: "natural",
              fill: "url(#fillDesktop)",
              stroke: "var(--color-desktop)",
              stackId: "a"
            }
          )
        ] })
      }
    ) })
  ] });
}
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function DataTable({
  columns,
  data: data2
}) {
  var _a;
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState(
    []
  );
  const [sorting, setSorting] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const table = useReactTable({
    data: data2,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  });
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center pb-4", children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "ml-auto", children: [
        /* @__PURE__ */ jsx(IconLayoutColumns, { className: "mr-2 h-4 w-4" }),
        "View",
        /* @__PURE__ */ jsx(IconChevronDown, { className: "ml-2 h-4 w-4" })
      ] }) }),
      /* @__PURE__ */ jsx(DropdownMenuContent, { align: "end", children: table.getAllColumns().filter((column) => column.getCanHide()).map((column) => {
        return /* @__PURE__ */ jsx(
          DropdownMenuCheckboxItem,
          {
            className: "capitalize",
            checked: column.getIsVisible(),
            onCheckedChange: (value) => column.toggleVisibility(!!value),
            children: column.id
          },
          column.id
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(TableRow, { children: headerGroup.headers.map((header) => {
        return /* @__PURE__ */ jsx(TableHead, { children: header.isPlaceholder ? null : flexRender(
          header.column.columnDef.header,
          header.getContext()
        ) }, header.id);
      }) }, headerGroup.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: ((_a = table.getRowModel().rows) == null ? void 0 : _a.length) ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
        TableRow,
        {
          "data-state": row.getIsSelected() && "selected",
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id))
        },
        row.id
      )) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: columns.length, className: "h-24 text-center", children: "No results." }) }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end space-x-2 py-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 text-sm text-muted-foreground", children: [
        table.getFilteredSelectedRowModel().rows.length,
        " of",
        " ",
        table.getFilteredRowModel().rows.length,
        " row(s) selected."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-x-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => table.previousPage(),
            disabled: !table.getCanPreviousPage(),
            children: "Previous"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => table.nextPage(),
            disabled: !table.getCanNextPage(),
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
const data = /* @__PURE__ */ JSON.parse(`[{"id":1,"header":"Cover page","type":"Cover page","status":"In Process","target":"18","limit":"5","reviewer":"Eddie Lake"},{"id":2,"header":"Table of contents","type":"Table of contents","status":"Done","target":"29","limit":"24","reviewer":"Eddie Lake"},{"id":3,"header":"Executive summary","type":"Narrative","status":"Done","target":"10","limit":"13","reviewer":"Eddie Lake"},{"id":4,"header":"Technical approach","type":"Narrative","status":"Done","target":"27","limit":"23","reviewer":"Jamik Tashpulatov"},{"id":5,"header":"Design","type":"Narrative","status":"In Process","target":"2","limit":"16","reviewer":"Jamik Tashpulatov"},{"id":6,"header":"Capabilities","type":"Narrative","status":"In Process","target":"20","limit":"8","reviewer":"Jamik Tashpulatov"},{"id":7,"header":"Integration with existing systems","type":"Narrative","status":"In Process","target":"19","limit":"21","reviewer":"Jamik Tashpulatov"},{"id":8,"header":"Innovation and Advantages","type":"Narrative","status":"Done","target":"25","limit":"26","reviewer":"Assign reviewer"},{"id":9,"header":"Overview of EMR's Innovative Solutions","type":"Technical content","status":"Done","target":"7","limit":"23","reviewer":"Assign reviewer"},{"id":10,"header":"Advanced Algorithms and Machine Learning","type":"Narrative","status":"Done","target":"30","limit":"28","reviewer":"Assign reviewer"},{"id":11,"header":"Adaptive Communication Protocols","type":"Narrative","status":"Done","target":"9","limit":"31","reviewer":"Assign reviewer"},{"id":12,"header":"Advantages Over Current Technologies","type":"Narrative","status":"Done","target":"12","limit":"0","reviewer":"Assign reviewer"},{"id":13,"header":"Past Performance","type":"Narrative","status":"Done","target":"22","limit":"33","reviewer":"Assign reviewer"},{"id":14,"header":"Customer Feedback and Satisfaction Levels","type":"Narrative","status":"Done","target":"15","limit":"34","reviewer":"Assign reviewer"},{"id":15,"header":"Implementation Challenges and Solutions","type":"Narrative","status":"Done","target":"3","limit":"35","reviewer":"Assign reviewer"},{"id":16,"header":"Security Measures and Data Protection Policies","type":"Narrative","status":"In Process","target":"6","limit":"36","reviewer":"Assign reviewer"},{"id":17,"header":"Scalability and Future Proofing","type":"Narrative","status":"Done","target":"4","limit":"37","reviewer":"Assign reviewer"},{"id":18,"header":"Cost-Benefit Analysis","type":"Plain language","status":"Done","target":"14","limit":"38","reviewer":"Assign reviewer"},{"id":19,"header":"User Training and Onboarding Experience","type":"Narrative","status":"Done","target":"17","limit":"39","reviewer":"Assign reviewer"},{"id":20,"header":"Future Development Roadmap","type":"Narrative","status":"Done","target":"11","limit":"40","reviewer":"Assign reviewer"},{"id":21,"header":"System Architecture Overview","type":"Technical content","status":"In Process","target":"24","limit":"18","reviewer":"Maya Johnson"},{"id":22,"header":"Risk Management Plan","type":"Narrative","status":"Done","target":"15","limit":"22","reviewer":"Carlos Rodriguez"},{"id":23,"header":"Compliance Documentation","type":"Legal","status":"In Process","target":"31","limit":"27","reviewer":"Sarah Chen"},{"id":24,"header":"API Documentation","type":"Technical content","status":"Done","target":"8","limit":"12","reviewer":"Raj Patel"},{"id":25,"header":"User Interface Mockups","type":"Visual","status":"In Process","target":"19","limit":"25","reviewer":"Leila Ahmadi"},{"id":26,"header":"Database Schema","type":"Technical content","status":"Done","target":"22","limit":"20","reviewer":"Thomas Wilson"},{"id":27,"header":"Testing Methodology","type":"Technical content","status":"In Process","target":"17","limit":"14","reviewer":"Assign reviewer"},{"id":28,"header":"Deployment Strategy","type":"Narrative","status":"Done","target":"26","limit":"30","reviewer":"Eddie Lake"},{"id":29,"header":"Budget Breakdown","type":"Financial","status":"In Process","target":"13","limit":"16","reviewer":"Jamik Tashpulatov"},{"id":30,"header":"Market Analysis","type":"Research","status":"Done","target":"29","limit":"32","reviewer":"Sophia Martinez"},{"id":31,"header":"Competitor Comparison","type":"Research","status":"In Process","target":"21","limit":"19","reviewer":"Assign reviewer"},{"id":32,"header":"Maintenance Plan","type":"Technical content","status":"Done","target":"16","limit":"23","reviewer":"Alex Thompson"},{"id":33,"header":"User Personas","type":"Research","status":"In Process","target":"27","limit":"24","reviewer":"Nina Patel"},{"id":34,"header":"Accessibility Compliance","type":"Legal","status":"Done","target":"18","limit":"21","reviewer":"Assign reviewer"},{"id":35,"header":"Performance Metrics","type":"Technical content","status":"In Process","target":"23","limit":"26","reviewer":"David Kim"},{"id":36,"header":"Disaster Recovery Plan","type":"Technical content","status":"Done","target":"14","limit":"17","reviewer":"Jamik Tashpulatov"},{"id":37,"header":"Third-party Integrations","type":"Technical content","status":"In Process","target":"25","limit":"28","reviewer":"Eddie Lake"},{"id":38,"header":"User Feedback Summary","type":"Research","status":"Done","target":"20","limit":"15","reviewer":"Assign reviewer"},{"id":39,"header":"Localization Strategy","type":"Narrative","status":"In Process","target":"12","limit":"19","reviewer":"Maria Garcia"},{"id":40,"header":"Mobile Compatibility","type":"Technical content","status":"Done","target":"28","limit":"31","reviewer":"James Wilson"},{"id":41,"header":"Data Migration Plan","type":"Technical content","status":"In Process","target":"19","limit":"22","reviewer":"Assign reviewer"},{"id":42,"header":"Quality Assurance Protocols","type":"Technical content","status":"Done","target":"30","limit":"33","reviewer":"Priya Singh"},{"id":43,"header":"Stakeholder Analysis","type":"Research","status":"In Process","target":"11","limit":"14","reviewer":"Eddie Lake"},{"id":44,"header":"Environmental Impact Assessment","type":"Research","status":"Done","target":"24","limit":"27","reviewer":"Assign reviewer"},{"id":45,"header":"Intellectual Property Rights","type":"Legal","status":"In Process","target":"17","limit":"20","reviewer":"Sarah Johnson"},{"id":46,"header":"Customer Support Framework","type":"Narrative","status":"Done","target":"22","limit":"25","reviewer":"Jamik Tashpulatov"},{"id":47,"header":"Version Control Strategy","type":"Technical content","status":"In Process","target":"15","limit":"18","reviewer":"Assign reviewer"},{"id":48,"header":"Continuous Integration Pipeline","type":"Technical content","status":"Done","target":"26","limit":"29","reviewer":"Michael Chen"},{"id":49,"header":"Regulatory Compliance","type":"Legal","status":"In Process","target":"13","limit":"16","reviewer":"Assign reviewer"},{"id":50,"header":"User Authentication System","type":"Technical content","status":"Done","target":"28","limit":"31","reviewer":"Eddie Lake"},{"id":51,"header":"Data Analytics Framework","type":"Technical content","status":"In Process","target":"21","limit":"24","reviewer":"Jamik Tashpulatov"},{"id":52,"header":"Cloud Infrastructure","type":"Technical content","status":"Done","target":"16","limit":"19","reviewer":"Assign reviewer"},{"id":53,"header":"Network Security Measures","type":"Technical content","status":"In Process","target":"29","limit":"32","reviewer":"Lisa Wong"},{"id":54,"header":"Project Timeline","type":"Planning","status":"Done","target":"14","limit":"17","reviewer":"Eddie Lake"},{"id":55,"header":"Resource Allocation","type":"Planning","status":"In Process","target":"27","limit":"30","reviewer":"Assign reviewer"},{"id":56,"header":"Team Structure and Roles","type":"Planning","status":"Done","target":"20","limit":"23","reviewer":"Jamik Tashpulatov"},{"id":57,"header":"Communication Protocols","type":"Planning","status":"In Process","target":"15","limit":"18","reviewer":"Assign reviewer"},{"id":58,"header":"Success Metrics","type":"Planning","status":"Done","target":"30","limit":"33","reviewer":"Eddie Lake"},{"id":59,"header":"Internationalization Support","type":"Technical content","status":"In Process","target":"23","limit":"26","reviewer":"Jamik Tashpulatov"},{"id":60,"header":"Backup and Recovery Procedures","type":"Technical content","status":"Done","target":"18","limit":"21","reviewer":"Assign reviewer"},{"id":61,"header":"Monitoring and Alerting System","type":"Technical content","status":"In Process","target":"25","limit":"28","reviewer":"Daniel Park"},{"id":62,"header":"Code Review Guidelines","type":"Technical content","status":"Done","target":"12","limit":"15","reviewer":"Eddie Lake"},{"id":63,"header":"Documentation Standards","type":"Technical content","status":"In Process","target":"27","limit":"30","reviewer":"Jamik Tashpulatov"},{"id":64,"header":"Release Management Process","type":"Planning","status":"Done","target":"22","limit":"25","reviewer":"Assign reviewer"},{"id":65,"header":"Feature Prioritization Matrix","type":"Planning","status":"In Process","target":"19","limit":"22","reviewer":"Emma Davis"},{"id":66,"header":"Technical Debt Assessment","type":"Technical content","status":"Done","target":"24","limit":"27","reviewer":"Eddie Lake"},{"id":67,"header":"Capacity Planning","type":"Planning","status":"In Process","target":"21","limit":"24","reviewer":"Jamik Tashpulatov"},{"id":68,"header":"Service Level Agreements","type":"Legal","status":"Done","target":"26","limit":"29","reviewer":"Assign reviewer"}]`);
const dashboardColumns = [
  {
    accessorKey: "header",
    header: "Header",
    cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "capitalize", children: row.getValue("header") })
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "capitalize", children: row.getValue("type") })
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "capitalize", children: row.getValue("status") })
  },
  {
    accessorKey: "target",
    header: "Target",
    cell: ({ row }) => /* @__PURE__ */ jsx("div", { children: row.getValue("target") })
  },
  {
    accessorKey: "limit",
    header: "Limit",
    cell: ({ row }) => /* @__PURE__ */ jsx("div", { children: row.getValue("limit") })
  },
  {
    accessorKey: "reviewer",
    header: "Reviewer",
    cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "capitalize", children: row.getValue("reviewer") })
  }
];
const dashboard = UNSAFE_withComponentProps(function() {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col gap-4 py-4 md:gap-6 md:py-6",
    children: [/* @__PURE__ */ jsx(SectionCards, {}), /* @__PURE__ */ jsx("div", {
      className: "px-4 lg:px-6",
      children: /* @__PURE__ */ jsx(ChartAreaInteractive, {})
    }), /* @__PURE__ */ jsx(DataTable, {
      data,
      columns: dashboardColumns
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dashboard
}, Symbol.toStringTag, { value: "Module" }));
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client"
    },
    "output": {
      "value": "C:\\Users\\w\\Desktop\\react-route-ia\\task-manager-ia\\app\\generated\\prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters"
    ],
    "sourceFilePath": "C:\\Users\\w\\Desktop\\react-route-ia\\task-manager-ia\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativePath": "../../../prisma",
  "clientVersion": "6.16.2",
  "engineVersion": "1c57fdcd7e44b29b9313256c76699e91c3ac3c43",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "sqlite",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\ngenerator client {\n  provider        = "prisma-client"\n  output          = "../app/generated/prisma"\n  previewFeatures = ["driverAdapters"]\n}\n\ndatasource db {\n  provider = "sqlite"\n  url      = env("DATABASE_URL")\n}\n\nmodel User {\n  id            Int       @id @default(autoincrement())\n  name          String\n  email         String    @unique\n  password_hash String\n  created_at    DateTime  @default(now())\n  updated_at    DateTime  @updatedAt\n  is_active     Int       @default(1)\n  last_login    DateTime?\n\n  @@map("users")\n}\n\nmodel Task {\n  id                        String   @id @default(uuid())\n  title                     String\n  description               String\n  steps                     String?\n  estimated_time            String?\n  implementation_suggestion String?\n  acceptance_criteria       String?\n  suggested_tests           String?\n  content                   String?\n  chat_history              String\n  created_at                DateTime @default(now())\n  updated_at                DateTime @updatedAt\n\n  @@map("tasks")\n}\n',
  "inlineSchemaHash": "5e6ca906664b31f535d2573120ba2c9fa1df878de9c0dbb68c8c1f58d1a176d7",
  "copyEngine": true,
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "dirname": ""
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"dbName":"users","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"email","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"password_hash","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updated_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"is_active","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":1,"isGenerated":false,"isUpdatedAt":false},{"name":"last_login","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Task":{"dbName":"tasks","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"title","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"steps","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"estimated_time","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"implementation_suggestion","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"acceptance_criteria","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"suggested_tests","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"content","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"chat_history","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updated_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false}},"enums":{},"types":{}}');
config.engineWasm = void 0;
config.compilerWasm = void 0;
function getPrismaClientClass(dirname) {
  config.dirname = dirname;
  return runtime.getPrismaClient(config);
}
runtime.Extensions.getExtensionContext;
({
  DbNull: runtime.objectEnumValues.classes.DbNull,
  JsonNull: runtime.objectEnumValues.classes.JsonNull,
  AnyNull: runtime.objectEnumValues.classes.AnyNull
});
runtime.objectEnumValues.instances.DbNull;
runtime.objectEnumValues.instances.JsonNull;
runtime.objectEnumValues.instances.AnyNull;
runtime.makeStrictEnum({
  Serializable: "Serializable"
});
runtime.Extensions.defineExtension;
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
const PrismaClient = getPrismaClientClass(__dirname);
path.join(__dirname, "query_engine-windows.dll.node");
path.join(process$1.cwd(), "app/generated/prisma/query_engine-windows.dll.node");
const adapter = new PrismaLibSQL({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});
globalThis.prismaClient ?? (globalThis.prismaClient = new PrismaClient({ adapter }));
const prisma = globalThis.prismaClient;
const taskColumns = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "capitalize", children: row.getValue("title") })
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "max-w-[400px] truncate overflow-hidden text-ellipsis whitespace-nowrap", children: row.getValue("description") })
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return /* @__PURE__ */ jsx("div", { children: date.toLocaleDateString() });
    }
  },
  {
    accessorKey: "estimated_time",
    header: "Estimated Time",
    cell: ({ row }) => /* @__PURE__ */ jsx("div", { children: row.getValue("estimated_time") })
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const task = row.original;
      return /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(Link, { to: `/tasks/${task.id}/edit`, children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", children: /* @__PURE__ */ jsx(PencilIcon, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsx("form", { action: `/tasks/${task.id}/delete`, method: "post", children: /* @__PURE__ */ jsx(Button, { variant: "destructive", size: "icon", type: "submit", children: /* @__PURE__ */ jsx(Trash2Icon, { className: "h-4 w-4" }) }) })
      ] });
    }
  }
];
function TaskList() {
  const { tasks: tasks2 } = useLoaderData();
  return /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsx(DataTable, { data: tasks2, columns: taskColumns }) });
}
async function loader$1() {
  const tasks2 = await prisma.task.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      created_at: true,
      updated_at: true,
      steps: true,
      estimated_time: true,
      implementation_suggestion: true,
      acceptance_criteria: true,
      suggested_tests: true,
      content: true,
      chat_history: true
    }
  });
  return {
    tasks: tasks2
  };
}
const tasks = UNSAFE_withComponentProps(function() {
  return /* @__PURE__ */ jsx(TaskList, {});
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tasks,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
function ChatInterface() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" })
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && status !== "in_progress") {
      sendMessage({ text: input });
      setInput("");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full w-full mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto space-y-4 mb-4", children: [
      messages.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
        /* @__PURE__ */ jsx(Bot, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground mb-2", children: "Welcome! How can I help you today?" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Start a conversation by typing a message below." })
      ] }),
      messages.map((message) => /* @__PURE__ */ jsxs("div", { className: `flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`, children: [
        message.role === "assistant" && /* @__PURE__ */ jsx(Avatar, { className: "w-8 h-8 bg-muted border", children: /* @__PURE__ */ jsx(AvatarFallback, { children: /* @__PURE__ */ jsx(Bot, { className: "w-4 h-4 text-muted-foreground" }) }) }),
        /* @__PURE__ */ jsx(
          Card,
          {
            className: `max-w-[80%] p-4 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border shadow-sm"}`,
            children: /* @__PURE__ */ jsx("div", { className: "text-sm leading-relaxed", children: message.parts.map((part, index) => {
              if (part.type === "text") {
                return /* @__PURE__ */ jsx("span", { children: part.text }, index);
              }
              return null;
            }) })
          }
        ),
        message.role === "user" && /* @__PURE__ */ jsx(Avatar, { className: "w-8 h-8 bg-secondary border", children: /* @__PURE__ */ jsx(AvatarFallback, { children: /* @__PURE__ */ jsx(User, { className: "w-4 h-4 text-secondary-foreground" }) }) })
      ] }, message.id)),
      status === "in_progress" && /* @__PURE__ */ jsxs("div", { className: "flex gap-3 justify-start", children: [
        /* @__PURE__ */ jsx(Avatar, { className: "w-8 h-8 bg-muted border", children: /* @__PURE__ */ jsx(AvatarFallback, { children: /* @__PURE__ */ jsx(Bot, { className: "w-4 h-4 text-muted-foreground" }) }) }),
        /* @__PURE__ */ jsx(Card, { className: "bg-card border shadow-sm p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" }),
            /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" }),
            /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-current rounded-full animate-bounce" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Thinking..." })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex gap-2 w-full", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1 relative", children: /* @__PURE__ */ jsx(
        Input,
        {
          value: input,
          onChange: (e) => setInput(e.target.value),
          placeholder: "Type your message...",
          disabled: status === "in_progress",
          className: "bg-background border focus:border-ring text-balance"
        }
      ) }),
      /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: !input.trim() || status === "in_progress", className: "px-4", children: [
        /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Send message" })
      ] })
    ] })
  ] });
}
function TaskCard({ title, content, icon: Icon }) {
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center space-x-2", children: [
      /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }),
      /* @__PURE__ */ jsx(CardTitle, { children: title })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: content })
  ] });
}
const mockTaskData = {
  title: "Secure Login Form with Authentication",
  description: "Implement a modern login form with field validation, session-based authentication, and real-time error feedback.",
  estimated_time: "2 days",
  steps: [
    "Create a form component using React",
    "Add field validation using a suitable library",
    "Connect backend for user authentication",
    "Persist sessions using SQLite",
    "Test full login and logout flow"
  ],
  suggested_tests: [
    "it('should render login form correctly')",
    "it('should validate input fields')",
    "it('should authenticate valid credentials')",
    "it('should prevent access with invalid credentials')"
  ],
  acceptance_criteria: [
    "Login form displays properly with required fields",
    "Invalid input is correctly flagged",
    "Valid users can log in and maintain a session",
    "Users are redirected upon login and logout"
  ],
  implementation_suggestion: "Use React Hook Form for input validation, Prisma ORM for managing user data, and configure protected routes using React Router 7."
};
function TaskContent() {
  const task = mockTaskData;
  const cardData = [
    {
      title: "Title",
      content: task.title,
      icon: BookOpen
    },
    {
      title: "Description",
      content: task.description,
      icon: ClipboardList
    },
    {
      title: "Estimated Time",
      content: task.estimated_time,
      icon: Clock
    },
    {
      title: "Steps",
      content: /* @__PURE__ */ jsx("ul", { className: "list-disc pl-5", children: task.steps.map((step, index) => /* @__PURE__ */ jsx("li", { children: step }, index)) }),
      icon: Lightbulb
    },
    {
      title: "Acceptance Criteria",
      content: /* @__PURE__ */ jsx("ul", { className: "list-disc pl-5", children: task.acceptance_criteria.map((criteria, index) => /* @__PURE__ */ jsx("li", { children: criteria }, index)) }),
      icon: CheckCircle
    },
    {
      title: "Suggested Tests",
      content: /* @__PURE__ */ jsx("ul", { className: "list-disc pl-5", children: task.suggested_tests.map((test, index) => /* @__PURE__ */ jsx("li", { children: test }, index)) }),
      icon: FlaskConical
    },
    {
      title: "Implementation Suggestion",
      content: task.implementation_suggestion,
      icon: Code
    }
  ];
  return /* @__PURE__ */ jsxs("section", { children: [
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 overflow-y-auto max-h-[calc(100vh-10rem)]", children: [
      " ",
      cardData.map((card, index) => /* @__PURE__ */ jsx(
        TaskCard,
        {
          title: card.title,
          content: card.content,
          icon: card.icon
        },
        index
      ))
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-4", children: /* @__PURE__ */ jsx(Button, { children: "Salvar Task" }) })
  ] });
}
function TaskChatBot() {
  return /* @__PURE__ */ jsxs("div", { className: "p-6 grid grid-cols-2 gap-6", children: [
    /* @__PURE__ */ jsx(ChatInterface, {}),
    /* @__PURE__ */ jsx(TaskContent, {})
  ] });
}
const taskNew = UNSAFE_withComponentProps(function() {
  return /* @__PURE__ */ jsx(TaskChatBot, {});
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: taskNew
}, Symbol.toStringTag, { value: "Module" }));
function TaskForm() {
  return /* @__PURE__ */ jsx("h1", { children: "Tasks Form" });
}
const taskEdit = UNSAFE_withComponentProps(function() {
  return /* @__PURE__ */ jsx(TaskForm, {});
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: taskEdit
}, Symbol.toStringTag, { value: "Module" }));
z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  is_active: z.number(),
  last_login: z.date().nullable()
});
const userColumns = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "is_active",
    header: "Active",
    cell: ({ row }) => row.original.is_active ? "Yes" : "No"
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return /* @__PURE__ */ jsx("div", { children: date.toLocaleDateString() });
    }
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("updated_at"));
      return /* @__PURE__ */ jsx("div", { children: date.toLocaleDateString() });
    }
  }
];
async function loader() {
  const users2 = await prisma.user.findMany();
  return {
    users: users2
  };
}
const users = UNSAFE_withComponentProps(function({
  loaderData
}) {
  const users2 = (loaderData == null ? void 0 : loaderData.users) || [];
  return /* @__PURE__ */ jsx("div", {
    className: "p-6",
    children: /* @__PURE__ */ jsx(DataTable, {
      data: users2,
      columns: userColumns
    })
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: users,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/task-manager-ia/assets/entry.client-D-paXP8X.js", "imports": ["/task-manager-ia/assets/chunk-B7RQU5TL-Dlr5QrnG.js", "/task-manager-ia/assets/index-CNbaUzR8.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/task-manager-ia/assets/root-BlUdhmus.js", "imports": ["/task-manager-ia/assets/chunk-B7RQU5TL-Dlr5QrnG.js", "/task-manager-ia/assets/index-CNbaUzR8.js"], "css": ["/task-manager-ia/assets/root-DraNOFI5.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "layout/layout": { "id": "layout/layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/task-manager-ia/assets/layout--oBxeQip.js", "imports": ["/task-manager-ia/assets/chunk-B7RQU5TL-Dlr5QrnG.js", "/task-manager-ia/assets/index-BNECFOSr.js", "/task-manager-ia/assets/index-DpZ4A9CP.js", "/task-manager-ia/assets/dropdown-menu-h-96fEXl.js", "/task-manager-ia/assets/avatar-CqVuFYKY.js", "/task-manager-ia/assets/index-CNbaUzR8.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard": { "id": "routes/dashboard", "parentId": "layout/layout", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/task-manager-ia/assets/dashboard-BK5WXsLm.js", "imports": ["/task-manager-ia/assets/chunk-B7RQU5TL-Dlr5QrnG.js", "/task-manager-ia/assets/index-BNECFOSr.js", "/task-manager-ia/assets/card-DXEUg30W.js", "/task-manager-ia/assets/dropdown-menu-h-96fEXl.js", "/task-manager-ia/assets/index-DpZ4A9CP.js", "/task-manager-ia/assets/index-CNbaUzR8.js", "/task-manager-ia/assets/data-table-B9tVTESo.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/tasks": { "id": "routes/tasks", "parentId": "layout/layout", "path": "tasks", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/task-manager-ia/assets/tasks-CCflXk93.js", "imports": ["/task-manager-ia/assets/chunk-B7RQU5TL-Dlr5QrnG.js", "/task-manager-ia/assets/data-table-B9tVTESo.js", "/task-manager-ia/assets/index-BNECFOSr.js", "/task-manager-ia/assets/dropdown-menu-h-96fEXl.js", "/task-manager-ia/assets/index-CNbaUzR8.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/task-new": { "id": "routes/task-new", "parentId": "layout/layout", "path": "tasks/new", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/task-manager-ia/assets/task-new-Bu3T4LHk.js", "imports": ["/task-manager-ia/assets/chunk-B7RQU5TL-Dlr5QrnG.js", "/task-manager-ia/assets/schemas-CTbPr3oH.js", "/task-manager-ia/assets/index-BNECFOSr.js", "/task-manager-ia/assets/card-DXEUg30W.js", "/task-manager-ia/assets/avatar-CqVuFYKY.js", "/task-manager-ia/assets/index-CNbaUzR8.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/task-edit": { "id": "routes/task-edit", "parentId": "layout/layout", "path": "tasks/edit/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/task-manager-ia/assets/task-edit-BN6Gqppc.js", "imports": ["/task-manager-ia/assets/chunk-B7RQU5TL-Dlr5QrnG.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/users": { "id": "routes/users", "parentId": "layout/layout", "path": "users", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/task-manager-ia/assets/users-oOWgPA0O.js", "imports": ["/task-manager-ia/assets/chunk-B7RQU5TL-Dlr5QrnG.js", "/task-manager-ia/assets/data-table-B9tVTESo.js", "/task-manager-ia/assets/schemas-CTbPr3oH.js", "/task-manager-ia/assets/index-BNECFOSr.js", "/task-manager-ia/assets/index-CNbaUzR8.js", "/task-manager-ia/assets/dropdown-menu-h-96fEXl.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/task-manager-ia/assets/manifest-9b98ede4.js", "version": "9b98ede4", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/task-manager-ia/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "layout/layout": {
    id: "layout/layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/dashboard": {
    id: "routes/dashboard",
    parentId: "layout/layout",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/tasks": {
    id: "routes/tasks",
    parentId: "layout/layout",
    path: "tasks",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/task-new": {
    id: "routes/task-new",
    parentId: "layout/layout",
    path: "tasks/new",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/task-edit": {
    id: "routes/task-edit",
    parentId: "layout/layout",
    path: "tasks/edit/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/users": {
    id: "routes/users",
    parentId: "layout/layout",
    path: "users",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
