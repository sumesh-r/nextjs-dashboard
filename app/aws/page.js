// Import required AWS SDK clients and commands for Node.js.
'use client';
import { useEffect, useState } from 'react';
import { ddbDocClient } from '@/app/config/ddbDocClient.js';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DeleteCommand } from '@aws-sdk/lib-dynamodb';
import Link from 'next/link.js';

const Styles = {
  tableHeadings:
    'text-sm font-medium text-gray-900 px-6 py-4 text-left border-2',
  tableData: 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap',
};

const ViewData = () => {
  let data = [];
  const [tableData, setTableData] = useState([]);

  //   scanning the dynamodb table
  const scanTable = async () => {
    try {
      data = await ddbDocClient.send(new ScanCommand({ TableName: 'example' }));
      setTableData(data.Items);
      console.log('success', data.Items);
    } catch (err) {
      console.log('Error', err);
    }
  };

  //   deleting an item from the table
  const deleteItem = async (primaryKeyValue, sortKeyValue) => {
    try {
      await ddbDocClient.send(
        new DeleteCommand({
          TableName: 'Users',
          Key: {
            id: primaryKeyValue, // primarykeyName : primaryKeyValue
            dateAdded: sortKeyValue, // sortkeyName : sortkeyValue
          },
        }),
      );
      console.log('Success - item deleted');
      scanTable();
    } catch (err) {
      console.log('Error', err);
    }
  };

  useEffect(() => {
    scanTable();
  }, []);

  return (
    <div className="container mx-auto flex h-screen w-screen flex-col items-center py-10">
      <div className="flex w-2/3 justify-end py-4">
        <Link
          href={{
            pathname: '/aws/add',
          }}
        >
          <button
            type="button"
            className="mr-2 inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
          >
            Add Data
          </button>
        </Link>
      </div>
      <p className="text-3xl">View Data</p>
      <div className="flex w-2/3 flex-col py-10">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th scope="col" className={Styles.tableHeadings}>
                      id
                    </th>
                    <th scope="col" className={Styles.tableHeadings}>
                      First Name
                    </th>
                    <th scope="col" className={Styles.tableHeadings}>
                      Last Name
                    </th>
                    <th scope="col" className={Styles.tableHeadings}>
                      City
                    </th>
                    <th scope="col" className={Styles.tableHeadings}>
                      Phone Number
                    </th>
                    <th
                      scope="col"
                      className="border-2 px-6 py-4 text-center text-sm font-medium text-gray-900"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item) => (
                    <tr className="border-b" key={item.id}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {item.id}
                      </td>
                      <td className={Styles.tableData}>{item.firstName}</td>
                      <td className={Styles.tableData}>{item.lastName}</td>
                      <td className={Styles.tableData}>{item.city}</td>
                      <td className={Styles.tableData}>{item.phoneNumber}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-center text-sm font-light text-gray-900">
                        <Link
                          href={{
                            pathname: '/updatedata',
                            query: {
                              id: item.id,
                              dateAdded: item.dateAdded,
                              firstName: item.firstName,
                              lastName: item.lastName,
                              city: item.city,
                              phoneNumber: item.phoneNumber,
                            },
                          }}
                        >
                          <button
                            type="button"
                            className="mr-2 inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                          >
                            Edit
                          </button>
                        </Link>
                        <button
                          type="button"
                          className="inline-block rounded bg-red-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg"
                          onClick={() => deleteItem(item.id, item.dateAdded)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewData;
