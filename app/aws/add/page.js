'use client';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '@/app/config/ddbDocClient';
import { useRouter } from 'next/navigation';

const styles = {
  inputField:
    'form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none',
};

const AddData = () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    console.log('hi start');

    // Get data from the form.
    const params = {
      TableName: 'example',
      Item: {
        id: Math.floor(Math.random() * 10000),
        dateAdded: new Date().toLocaleString(),
        dateModified: '',
        example: '2',
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        city: event.target.city.value,
        phoneNumber: event.target.phoneNumber.value,
      },
    };

    console.log('before sending');
    try {
      const data = await ddbDocClient.send(new PutCommand(params));
      console.log('Success - item added', data);
      alert('Data Added Successfully');
      router.push('/aws');
      document.getElementById('addData-form').reset();
    } catch (err) {
      console.log('Error', err.stack);
    }
    console.log('after sending');
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <p className="mb-20 text-3xl">Add Data</p>
        <div className="block w-1/3 justify-self-center rounded-lg bg-white p-6 shadow-lg">
          <form onSubmit={handleSubmit} id="addData-form">
            <div className="form-group mb-6">
              <label
                htmlFor="firstName"
                className="form-label mb-2 inline-block text-gray-700"
              >
                First Name
              </label>
              <input type="text" className={styles.inputField} id="firstName" />
            </div>
            <div className="form-group mb-6">
              <label
                htmlFor="lastName"
                className="form-label mb-2 inline-block text-gray-700"
              >
                Last Name
              </label>
              <input type="text" className={styles.inputField} id="lastName" />
            </div>
            <div className="form-group mb-6">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label mb-2 inline-block text-gray-700"
              >
                City
              </label>
              <input type="text" className={styles.inputField} id="city" />
            </div>
            <div className="form-group mb-6">
              <label
                htmlFor="phoneNumber"
                className="form-label mb-2 inline-block text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="number"
                className={styles.inputField}
                id="phoneNumber"
              />
            </div>

            <button
              type="submit"
              className="rounded bg-blue-600
              px-6
              py-2.5
              text-xs
              font-medium
              uppercase
              leading-tight
              text-white
              shadow-md
              transition duration-150
              ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
              focus:shadow-lg focus:outline-none
              focus:ring-0
              active:bg-blue-800
              active:shadow-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddData;
