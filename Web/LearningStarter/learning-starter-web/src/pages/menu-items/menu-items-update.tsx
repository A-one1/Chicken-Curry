import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { BaseUrl } from "../../constants/env-vars";
import { MenuItemsGetDto } from "../../constants/types";
import { Icon, Label, Menu, Table } from "semantic-ui-react";
import { routes } from "../../routes/config";
import { UpdatePage } from "./update";
import { Link } from 'react-router-dom';

export const MenuItemsUpdatePage = () => {
  const [menuItems, setMenuItems] = useState<MenuItemsGetDto[]>();

  const fetchMenuItems = async () => {
    const response = await axios.get(`${BaseUrl}/api/menuitems`);

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      setMenuItems(response.data.data);
    }
  };


  useEffect(() => {
    fetchMenuItems();
  }, []);
  return (
    <>
      <div>
        <Table fixed inverted>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign = "center" class="collapsing">ID</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Price</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Description</Table.HeaderCell>
              <Table.HeaderCell textAlign="center"> </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
        {menuItems ? (
          menuItems.map((menuItems) => {
            return (
              <>
                <div className="row">
                  <Table fixed>
                    <Table.Body>
                      <Table.Row key={menuItems.id}>
                        <Table.Cell class="collapsing" textAlign="center">
                          {" "}
                          {menuItems.id}{" "}
                        </Table.Cell>
                        <Table.Cell textAlign="center"> {menuItems.name} </Table.Cell>
                        <Table.Cell textAlign="center"> {menuItems.price}</Table.Cell>
                        <Table.Cell textAlign="center"> {menuItems.description}</Table.Cell>
                        <Table.Cell textAlign="right">
                          <Link to={`/menu-items/update/${menuItems.id}`}>
                            <Button icon primary>
                              Update
                            </Button>
                          </Link>
                          <Button icon secondary onClick={() => {}}>
                            Delete{" "}
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
              </>
            );
          })
        ) : (
          <div>LOADING...</div>
        )}
      </div>
    </>
  );
};
