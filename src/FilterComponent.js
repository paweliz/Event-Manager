import { useState } from 'react';
import Modal from './Modal';
import DateTimePicker from 'react-datetime-picker';

const FilterComponent = ({
  maxParticipants,
  setMaxParticipants,
  date,
  setDate,
  endDate,
  setEndDate,
  category,
  setCategory,
  submit,
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        className="flex flex-row mr-1 border-r-2 pr-2"
        onClick={() => setOpenModal(true)}>
        <svg
          className="w-6 h-6 bg-transparent mx-3 stroke-current group-hover:stroke-white"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            stroke-width="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
        </svg>
        <p className="-ml-2">Filter</p>
      </button>
      <Modal showModal={openModal} setShowModal={setOpenModal} submit={submit}>
        <div>
          <div className="flex flex-col">
            <label>Number of participants:</label>
            <input
              className="border-b-2 hover:border-black focus:border-black focus:outline-none"
              type="number"
              min="1"
              value={maxParticipants}
              onChange={e => setMaxParticipants(parseInt(e.target.value, 10))}
            />
          </div>
          <div className="flex flex-col">
            <label>Start date:</label>
            <DateTimePicker
              className="cursor-pointer border-b-2 hover:border-black focus:border-black focus:outline-none"
              type="date"
              value={date}
              minDate={new Date()}
              onChange={e => setDate(e)}
              disableClock={true}
            />
          </div>

          <div className="flex flex-col">
            <label>End date:</label>
            <DateTimePicker
              className="cursor-pointer border-b-2 hover:border-black focus:border-black focus:outline-none"
              type="date"
              value={endDate}
              minDate={new Date()}
              onChange={e => setEndDate(e)}
              disableClock={true}
            />
          </div>
          <div className="flex flex-col">
            <label>Category:</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="cursor-pointer border-b-2 hover:border-black focus:outline-none focus:border-black">
              <option value="">---</option>
              <option value="Arts">Arts</option>
              <option value="Business">Business</option>
              <option value="Charity">Charity</option>
              <option value="Music">Music</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FilterComponent;
