import React, { useState } from "react";
import { Table, Tag, Button, Card, Tooltip, Image, Modal } from "antd";
import { CheckCircle, ChevronDown, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { TOrder } from "../../types";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/auth/authSlice";
import {
  useDeleteOrderMutation,
  useGetUserOrdersDataQuery,
} from "../../redux/Features/OrderManagement/orderApi";

const OrderHistory: React.FC = () => {
  const user = useAppSelector(useCurrentUser);
  const [deleteOrder] = useDeleteOrderMutation();
  const { data: res, isFetching } = useGetUserOrdersDataQuery(user?.email, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  // modal related
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedInfo, setDeletedInfo] = useState({
    id: "",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const result = await deleteOrder(deletedInfo).unwrap();
    toast.success(result.message);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // table related data
  const orders = res?.data?.map((order: TOrder) => ({
    ...order,
    key: order?._id,
  }));

  const handleDeleteOrder = async (orderId: string) => {
    const orderInfo = { id: orderId };
    try {
      setDeletedInfo(orderInfo);
      showModal();
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  const expandedRowRender = (record: TOrder) => {
    const productColumns = [
      {
        title: "Image",
        dataIndex: "imageUrl",
        key: "imageUrl",
        width: 120,
        render: (imageUrl: string) => (
          <Image
            src={imageUrl}
            alt="Product"
            width={80}
            height={80}
            className="object-cover rounded-lg"
            fallback="data:image/png;base64,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"
          />
        ),
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        render: (title: string) => <span className="font-medium">{title}</span>,
      },
      {
        title: "Author Name",
        key: "authorName",
        dataIndex: "authorName",
        render: (authorName: string) => (
          <span className="text-gray-600">
            {authorName || "Unknown"}
          </span>
        ),
      },
      {
        title: "authorEmail",
        key: "authorEmail",
        dataIndex: "authorEmail",
        render: (authorEmail:string) => {
          return (
            <Tag color="blue">{authorEmail || "Unknown"}</Tag>
          );
        },
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        render: (description: string) => (
          <p className="text-gray-600 line-clamp-2">{description}</p>
        ),
      },
      {
        title: "Quantity",
        dataIndex: "numberOfProduct",
        key: "numberOfProduct",
        width: 100,
        render: (quantity: number) => <Tag color="blue">{quantity} items</Tag>,
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        width: 120,
        render: (price: number) => (
          <span className="font-medium">${Number(price).toFixed(2)}</span>
        ),
      },
    ];

    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Order Products</h3>
        <Table
          columns={productColumns}
          dataSource={record.products}
          pagination={false}
          rowKey="_id"
          className="nested-table"
        />
      </div>
    );
  };

  const columns = [
    {
      title: "Transaction Id",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (id: string) => (
        <span className="font-medium text-gray-900">{id}</span>
      ),
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => <span className="text-gray-600">{new Date(createdAt).toLocaleDateString()}</span>,
    },
    {
      title: "Total Amount",
      dataIndex: "total_order_amount",
      key: "total_order_amount",
      render: (total: number) => (
        <span className="font-medium">${Number(total).toFixed(2)}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status: string) => {
        const color =
          status === "delivered"
            ? "green"
            : status === "shipping"
            ? "blue"
            : "gold";
        return (
          <Tag color={color} className="capitalize">
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record: TOrder) => (
        <Tooltip title="Delete Order">
          <Button
            type="primary"
            danger
            onClick={() => handleDeleteOrder(record._id)}
            icon={<CheckCircle className="h-4 w-4" />}
          >
            Delete
          </Button>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold my-12">Order History</h1>
      <div className="w-full overflow-x-auto  bg-white">
        <Table
          columns={columns}
          dataSource={orders}
          loading={isFetching}
          rowKey="_id"
          expandable={{
            expandedRowRender,
            defaultExpandAllRows: true,
            defaultExpandedRowKeys: ["0"],
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <Button
                  className="text-red-500  p-3"
                  type="text"
                  onClick={(e) => onExpand(record, e)}
                  icon={<ChevronDown className="h-4 w-4" />}
                />
              ) : (
                <Button
                  type="text"
                  className="text-red-500 p-3"
                  onClick={(e) => onExpand(record, e)}
                  icon={<ChevronRight className="h-4 w-4" />}
                />
              ),
          }}
          className="orders-table"
        />
      </div>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h2>Are you sure? want to delete the order history!...</h2>
      </Modal>
    </div>
  );
};

export default OrderHistory;
