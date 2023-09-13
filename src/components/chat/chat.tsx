"use client";
import { useThemeContext } from '../../context/contextProvider'


import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Check, Plus, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";



type User = (typeof users)[number];
function ChatCard() {


  const { chatTo, setChatTo} = useThemeContext();



  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [userids, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const scrollableContainerRef = useRef(null);
  const timeStamp = 12;

  const socket = io.connect("http://localhost:4000"); // Replace with your server's URL
  useEffect(() => {
    // Emitting the message ok!
    const useridno = prompt("Enter your usersid")
    socket.emit("userId", useridno);

    socket.on("message", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: message, timeStamp: timeStamp },
      ]);

      setTimeout(() => {
        if (scrollableContainerRef.current) {
          scrollableContainerRef.current.window;
        }
      }, 100);
      // Adjust the delay as needed
    });
  }, []);

  const sendMessage = (e) => {
   
    e.preventDefault();
    const message = { message: messageInput, userId: chatTo.id };
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: messageInput, sender: userids, timeStamp },
    ]);
    socket.emit("sendMessage", message);
    setMessageInput("");
  };

   


  console.log(chatTo)


const shortName = chatTo.name.split(' ');

const fName = shortName[0][0];
const lName = shortName[1][0];





  return (
    <>
      <Card className="w-2/3 h-screen">
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="Image" />
              <AvatarFallback>{fName + lName}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{chatTo.name}</p>
              <p className="text-sm text-muted-foreground">{chatTo.email}</p>
            </div>
          </div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="ml-auto rounded-full"
                  onClick={() => setOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>New message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent>
          <div
            ref={scrollableContainerRef}
            className="space-y-4 h-[70vh]  overflow-y-auto"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.sender === "1"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.message}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={sendMessage}
            className="flex w-full items-center space-x-2"
          >
            <Input
              value={messageInput}
              placeholder="Type your message..."
              className="flex-1"
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <select onChange={(e) => setUser(e.target.value)} name="" id="">
              <option>{chatTo.id}</option>
          
            </select>
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-0 outline-none">
          <DialogHeader className="px-4 pb-4 pt-5">
            <DialogTitle>New message</DialogTitle>
            <DialogDescription>
              Invite a user to this thread. This will create a new group
              message.
            </DialogDescription>
          </DialogHeader>
          <Command className="overflow-hidden rounded-t-none border-t">
            <CommandInput placeholder="Search user..." />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup className="p-2">
             
                  <CommandItem
                   
                    className="flex items-center px-2"
                    onSelect={() => {
                      // if (selectedUsers.includes(user)) {
                      //   return setSelectedUsers(
                      //     selectedUsers.filter(
                      //       (selectedUser) => selectedUser !== user
                      //     )
                      //   )
                      // }
                      // return setSelectedUsers(
                      //   [...users].filter((u) =>
                      //     [...selectedUsers, user].includes(u)
                      //   )
                      // )
                    }}
                  >
                    <Avatar>
                      <AvatarImage src={chatTo.avatar} alt="Image" />
                      <AvatarFallback>{chatTo.name}</AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <p className="text-sm font-medium leading-none">
                        {chatTo.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {chatTo.email}
                      </p>
                    </div>
                    {/* {selectedUsers.includes(user) ? (
                    <Check className="ml-auto flex h-5 w-5 text-primary" />
                  ) : null} */}
                  </CommandItem>
              
              </CommandGroup>
            </CommandList>
          </Command>
          <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
            {/* {selectedUsers.length > 0 ? (
            <div className="flex -space-x-2 overflow-hidden">
              {selectedUsers.map((user) => (
                <Avatar
                  key={user.email}
                  className="inline-block border-2 border-background"
                >
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              ))} */}
            {/* </div> */}
            {/* ) : (
            <p className="text-sm text-muted-foreground">
              Select users to add to this thread.
            </p>
          )} */}
            {/* <Button
            disabled={selectedUsers.length < 2}
            onClick={() => {
              setOpen(false)
            }}
          > */}
            Continue
            {/* </Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ChatCard;
