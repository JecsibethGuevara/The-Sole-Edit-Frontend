import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Store } from "@/types/store.interfaces";
import { Edit, Mail, MapPin, Phone, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

type StoreCardProps = {
  store: Store;
  handleDelete: (id: number) => void;
};

const handleEdit = (store: Store) => {
  console.log("Edit store:", store);
};

export const StoreCard = ({ store, handleDelete }: StoreCardProps) => {
  return (
    <Card key={store.id} className="p-6 hover:shadow-lg transition-shadow">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">{store.name}</h3>
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground">{store.address}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{store.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{store.phone}</span>
        </div>
      </div>

      <div className="border-t border-border pt-4 mb-4">
        <p className="text-sm text-muted-foreground mb-3">
          {30} products listed
        </p>
        <div className="flex gap-2 flex-wrap">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              store.is_active
                ? "bg-green-500/10 text-green-600"
                : "bg-red-500/10 text-red-600"
            }`}
          >
            {store.is_active ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-border">
        <Button
          size="sm"
          variant="outline"
          className="flex-1 bg-transparent"
          onClick={() => handleEdit(store)}
        >
          <Link
            href={`/admin/stores/${store.id}/edit`}
            className="flex  w-full justify-center items-center"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Link>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-destructive hover:text-destructive"
          onClick={() => handleDelete(store.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
