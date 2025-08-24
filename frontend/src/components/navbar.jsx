'use client';

import * as React from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onLogout }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 px-4 md:px-6 dark:bg-gray-900">
      <div className="container mx-auto flex h-16 items-center justify-between">
        {/* Left side: Title */}
        <div>
          <h1 className="text-lg font-semibold text-primary">Erino Assignment</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/newLead')}>
            New Lead
          </Button>
          {user && (
            <Button variant="destructive" onClick={onLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
